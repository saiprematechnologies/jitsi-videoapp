// Re-export JitsiMeetJS from the library lib-jitsi-meet to (the other features
// of) the project jitsi-meet-react.
import JitsiMeetJS from './_';
export { JitsiMeetJS as default };

// XXX Re-export the types exported by JitsiMeetJS in order to prevent undefined
// imported JitsiMeetJS. It may be caused by import cycles but I have not
// confirmed the theory.
export const JitsiConferenceErrors = JitsiMeetJS.errors.conference;
export const JitsiConferenceEvents = JitsiMeetJS.events.conference;
export const JitsiConnectionErrors = JitsiMeetJS.errors.connection;
export const JitsiConnectionEvents = JitsiMeetJS.events.connection;
export const JitsiTrackErrors = JitsiMeetJS.errors.track;
export const JitsiTrackEvents = JitsiMeetJS.events.track;

export * from './actions';
export * from './actionTypes';
export * from './constants';
export * from './functions';

import './middleware';
import './reducer';
