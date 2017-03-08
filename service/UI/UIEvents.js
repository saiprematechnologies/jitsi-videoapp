export default {
    NICKNAME_CHANGED: "UI.nickname_changed",
    SELECTED_ENDPOINT: "UI.selected_endpoint",
    PINNED_ENDPOINT: "UI.pinned_endpoint",
    /**
     * Notifies that local user created text message.
     */
    MESSAGE_CREATED: "UI.message_created",
    /**
     * Notifies that local user changed language.
     */
    LANG_CHANGED: "UI.lang_changed",
    /**
     * Notifies that local user changed email.
     */
    EMAIL_CHANGED: "UI.email_changed",
    /**
     * Notifies that "start muted" settings changed.
     */
    START_MUTED_CHANGED: "UI.start_muted_changed",
    AUDIO_MUTED: "UI.audio_muted",
    VIDEO_MUTED: "UI.video_muted",
    ETHERPAD_CLICKED: "UI.etherpad_clicked",
    SHARED_VIDEO_CLICKED: "UI.start_shared_video",
    /**
     * Indicates that an invite button has been clicked.
     */
    INVITE_CLICKED: "UI.invite_clicked",
    /**
     * Updates shared video with params: url, state, time(optional)
     * Where url is the video link, state is stop/start/pause and time is the
     * current video playing time.
     */
    UPDATE_SHARED_VIDEO: "UI.update_shared_video",
    USER_KICKED: "UI.user_kicked",
    REMOTE_AUDIO_MUTED: "UI.remote_audio_muted",
    TOGGLE_FULLSCREEN: "UI.toogle_fullscreen",
    FULLSCREEN_TOGGLED: "UI.fullscreen_toggled",
    AUTH_CLICKED: "UI.auth_clicked",
    TOGGLE_CHAT: "UI.toggle_chat",
    TOGGLE_SETTINGS: "UI.toggle_settings",
    TOGGLE_CONTACT_LIST: "UI.toggle_contact_list",
    /**
     * Notifies that the profile toolbar button has been clicked.
     */
    TOGGLE_PROFILE: "UI.toggle_profile",
    /**
     * Notifies that a command to toggle the film strip has been issued. The
     * event may optionally specify a {Boolean} (primitive) value to assign to
     * the visibility of the film strip (i.e. the event may act as a setter).
     * The very toggling of the film strip may or may not occurred at the time
     * of the receipt of the event depending on the position of the receiving
     * event listener in relation to the event listener which carries out the
     * command to toggle the film strip.
     *
     * @see {TOGGLED_FILM_STRIP}
     */
    TOGGLE_FILM_STRIP: "UI.toggle_film_strip",
    /**
     * Notifies that the film strip was (actually) toggled. The event supplies
     * a {Boolean} (primitive) value indicating the visibility of the film
     * strip after the toggling (at the time of the event emission).
     *
     * @see {TOGGLE_FILM_STRIP}
     */
    TOGGLED_FILM_STRIP: "UI.toggled_film_strip",
    TOGGLE_SCREENSHARING: "UI.toggle_screensharing",
    TOGGLED_SHARED_DOCUMENT: "UI.toggled_shared_document",
    CONTACT_CLICKED: "UI.contact_clicked",
    HANGUP: "UI.hangup",
    LOGOUT: "UI.logout",
    RECORDING_TOGGLED: "UI.recording_toggled",
    SIP_DIAL: "UI.sip_dial",
    SUBJECT_CHANGED: "UI.subject_changed",
    VIDEO_DEVICE_CHANGED: "UI.video_device_changed",
    AUDIO_DEVICE_CHANGED: "UI.audio_device_changed",
    AUDIO_OUTPUT_DEVICE_CHANGED: "UI.audio_output_device_changed",

    /**
     * Notifies interested listeners that the follow-me feature is enabled or
     * disabled.
     */
    FOLLOW_ME_ENABLED: "UI.follow_me_enabled",

    /**
     * Notifies that flipX property of the local video is changed.
     */
    LOCAL_FLIPX_CHANGED: "UI.local_flipx_changed",

    // An event which indicates that the resolution of a remote video has
    // changed.
    RESOLUTION_CHANGED: "UI.resolution_changed",

    /**
     * Notifies that the button "Go to webstore" is pressed on the dialog for
     * external extension installation.
     */
    OPEN_EXTENSION_STORE: "UI.open_extension_store",

    /**
     * Notifies that the button "Cancel" is pressed on the dialog for
     * external extension installation.
     */
    EXTERNAL_INSTALLATION_CANCELED: "UI.external_installation_canceled",

    /**
     * Notifies that the side toolbar container has been toggled. The actual
     * event must contain the identifier of the container that has been toggled
     * and information about toggle on or off.
     */
    SIDE_TOOLBAR_CONTAINER_TOGGLED: "UI.side_container_toggled",

    /**
     * Notifies that the raise hand has been changed.
     */
    LOCAL_RAISE_HAND_CHANGED: "UI.local_raise_hand_changed",

    /**
     * Notifies that the avatar is displayed or not on the largeVideo.
     */
    LARGE_VIDEO_AVATAR_VISIBLE: "UI.large_video_avatar_visible",

    /**
     * Notifies that the displayed particpant id on the largeVideo is changed.
     */
    LARGE_VIDEO_ID_CHANGED: "UI.large_video_id_changed",

    /**
     * Toggling room lock
     */
    TOGGLE_ROOM_LOCK: "UI.toggle_room_lock",

    /**
     * Adding contact to contact list
     */
    CONTACT_ADDED: "UI.contact_added",

    /**
     * Removing the contact from contact list
     */
    CONTACT_REMOVED: "UI.contact_removed",

    /**
     * Indicates that a user avatar has changed.
     */
    USER_AVATAR_CHANGED: "UI.user_avatar_changed",

    /**
     * Display name changed.
     */
    DISPLAY_NAME_CHANGED: "UI.display_name_changed",

    /**
     * Indicates that a password is required for the call.
     */
    PASSWORD_REQUIRED: "UI.password_required",

    /**
     * Show custom popup/tooltip for a specified button.
     */
    SHOW_CUSTOM_TOOLBAR_BUTTON_POPUP: "UI.show_custom_toolbar_button_popup"
};