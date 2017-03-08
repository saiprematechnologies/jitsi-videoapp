import { JitsiConferenceEvents } from '../lib-jitsi-meet';
import {
    changeParticipantEmail,
    dominantSpeakerChanged,
    participantJoined,
    participantLeft,
    participantRoleChanged
} from '../participants';
import { trackAdded, trackRemoved } from '../tracks';

import {
    CONFERENCE_FAILED,
    CONFERENCE_JOINED,
    CONFERENCE_LEFT,
    CONFERENCE_WILL_JOIN,
    CONFERENCE_WILL_LEAVE,
    LOCK_STATE_CHANGED,
    SET_PASSWORD,
    SET_ROOM
} from './actionTypes';
import { EMAIL_COMMAND } from './constants';
import { _addLocalTracksToConference } from './functions';

/**
 * Adds conference (event) listeners.
 *
 * @param {JitsiConference} conference - The JitsiConference instance.
 * @param {Dispatch} dispatch - The Redux dispatch function.
 * @private
 * @returns {void}
 */
function _addConferenceListeners(conference, dispatch) {
    conference.on(
            JitsiConferenceEvents.CONFERENCE_FAILED,
            (...args) => dispatch(conferenceFailed(conference, ...args)));
    conference.on(
            JitsiConferenceEvents.CONFERENCE_JOINED,
            (...args) => dispatch(_conferenceJoined(conference, ...args)));
    conference.on(
            JitsiConferenceEvents.CONFERENCE_LEFT,
            (...args) => dispatch(_conferenceLeft(conference, ...args)));

    conference.on(
            JitsiConferenceEvents.DOMINANT_SPEAKER_CHANGED,
            (...args) => dispatch(dominantSpeakerChanged(...args)));

    conference.on(
            JitsiConferenceEvents.LOCK_STATE_CHANGED,
            (...args) => dispatch(_lockStateChanged(conference, ...args)));

    conference.on(
            JitsiConferenceEvents.TRACK_ADDED,
            t => t && !t.isLocal() && dispatch(trackAdded(t)));
    conference.on(
            JitsiConferenceEvents.TRACK_REMOVED,
            t => t && !t.isLocal() && dispatch(trackRemoved(t)));

    conference.on(
            JitsiConferenceEvents.USER_JOINED,
            (id, user) => dispatch(participantJoined({
                id,
                name: user.getDisplayName(),
                role: user.getRole()
            })));
    conference.on(
            JitsiConferenceEvents.USER_LEFT,
            (...args) => dispatch(participantLeft(...args)));
    conference.on(
            JitsiConferenceEvents.USER_ROLE_CHANGED,
            (...args) => dispatch(participantRoleChanged(...args)));

    conference.addCommandListener(
            EMAIL_COMMAND,
            (data, id) => dispatch(changeParticipantEmail(id, data.value)));
}

/**
 * Signals that a specific conference has failed.
 *
 * @param {JitsiConference} conference - The JitsiConference that has failed.
 * @param {string} error - The error describing/detailing the cause of the
 * failure.
 * @returns {{
 *     type: CONFERENCE_FAILED,
 *     conference: JitsiConference,
 *     error: string
 * }}
 * @public
 */
export function conferenceFailed(conference, error) {
    return {
        type: CONFERENCE_FAILED,
        conference,
        error
    };
}

/**
 * Attach any pre-existing local media to the conference once the conference has
 * been joined.
 *
 * @param {JitsiConference} conference - The JitsiConference instance which was
 * joined by the local participant.
 * @returns {Function}
 */
function _conferenceJoined(conference) {
    return (dispatch, getState) => {
        const localTracks
            = getState()['features/base/tracks']
                .filter(t => t.local)
                .map(t => t.jitsiTrack);

        if (localTracks.length) {
            _addLocalTracksToConference(conference, localTracks);
        }

        dispatch({
            type: CONFERENCE_JOINED,
            conference
        });
    };
}

/**
 * Signals that a specific conference has been left.
 *
 * @param {JitsiConference} conference - The JitsiConference instance which was
 * left by the local participant.
 * @returns {{
 *      type: CONFERENCE_LEFT,
 *      conference: JitsiConference
 *  }}
 */
function _conferenceLeft(conference) {
    return {
        type: CONFERENCE_LEFT,
        conference
    };
}

/**
 * Signals the intention of the application to have the local participant join a
 * conference with a specific room (name). Similar in fashion
 * to CONFERENCE_JOINED.
 *
 * @param {string} room - The room (name) which identifies the conference the
 * local participant will (try to) join.
 * @returns {{
 *      type: CONFERENCE_WILL_JOIN,
 *      room: string
 *  }}
 */
function _conferenceWillJoin(room) {
    return {
        type: CONFERENCE_WILL_JOIN,
        room
    };
}

/**
 * Signals the intention of the application to have the local participant leave
 * a specific conference. Similar in fashion to CONFERENCE_LEFT. Contrary to it
 * though, it's not guaranteed because CONFERENCE_LEFT may be triggered by
 * lib-jitsi-meet and not the application.
 *
 * @param {JitsiConference} conference - The JitsiConference instance which will
 * be left by the local participant.
 * @returns {{
 *      type: CONFERENCE_LEFT,
 *      conference: JitsiConference
 *  }}
 */
export function conferenceWillLeave(conference) {
    return {
        type: CONFERENCE_WILL_LEAVE,
        conference
    };
}

/**
 * Initializes a new conference.
 *
 * @returns {Function}
 */
export function createConference() {
    return (dispatch, getState) => {
        const state = getState();
        const connection = state['features/base/connection'].connection;

        if (!connection) {
            throw new Error('Cannot create conference without connection');
        }

        const { password, room } = state['features/base/conference'];

        if (typeof room === 'undefined' || room === '') {
            throw new Error('Cannot join conference without room name');
        }

        dispatch(_conferenceWillJoin(room));

        // TODO Take options from config.
        const conference
            = connection.initJitsiConference(

                // XXX Lib-jitsi-meet does not accept uppercase letters.
                room.toLowerCase(),
                {
                    openSctp: true

                    // FIXME I tested H.264 from iPhone 6S during a morning
                    // standup but, unfortunately, the other participants who
                    // happened to be running the Web app saw only black.
                    //
                    // preferH264: true
                });

        _addConferenceListeners(conference, dispatch);

        conference.join(password);
    };
}

/**
 * Signals that the lock state of a specific JitsiConference changed.
 *
 * @param {JitsiConference} conference - The JitsiConference which had its lock
 * state changed.
 * @param {boolean} locked - If the specified conference became locked, true;
 * otherwise, false.
 * @returns {{
 *     type: LOCK_STATE_CHANGED,
 *     conference: JitsiConference,
 *     locked: boolean
 * }}
 */
function _lockStateChanged(conference, locked) {
    return {
        type: LOCK_STATE_CHANGED,
        conference,
        locked
    };
}

/**
 * Sets the password to join or lock a specific JitsiConference.
 *
 * @param {JitsiConference} conference - The JitsiConference which requires a
 * password to join or is to be locked with the specified password.
 * @param {Function} method - The JitsiConference method of password protection
 * such as join or lock.
 * @param {string} password - The password with which the specified conference
 * is to be joined or locked.
 * @returns {Function}
 */
export function setPassword(conference, method, password) {
    return (dispatch, getState) => {
        switch (method) {
        case conference.join: {
            let state = getState()['features/base/conference'];

            // Make sure that the action will set a password for a conference
            // that the application wants joined.
            if (state.passwordRequired === conference) {
                dispatch({
                    type: SET_PASSWORD,
                    conference,
                    method,
                    password
                });

                // Join the conference with the newly-set password.

                // Make sure that the action did set the password.
                state = getState()['features/base/conference'];
                if (state.password === password
                        && !state.passwordRequired

                        // Make sure that the application still wants the
                        // conference joined.
                        && !state.conference) {
                    method.call(conference, password);
                }
            }
            break;
        }

        case conference.lock: {
            const state = getState()['features/base/conference'];

            if (state.conference === conference) {
                return (
                    method.call(conference, password)
                        .then(() => dispatch({
                            type: SET_PASSWORD,
                            conference,
                            method,
                            password
                        })));
            }

            return Promise.reject();
        }
        }
    };
}

/**
 * Sets (the name of) the room of the conference to be joined.
 *
 * @param {(string|undefined)} room - The name of the room of the conference to
 * be joined.
 * @returns {{
 *      type: SET_ROOM,
 *      room: string
 *  }}
 */
export function setRoom(room) {
    return {
        type: SET_ROOM,
        room
    };
}
