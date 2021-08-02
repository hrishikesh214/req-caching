export var after_time = function (t) {
    if (t.seconds) {
        return new Date(Date.now() + t.seconds * 1000);
    }
    if (t.minutes) {
        return new Date(Date.now() + t.minutes * 60 * 1000);
    }
    if (t.hours) {
        return new Date(Date.now() + t.hours * 60 * 60 * 1000);
    }
    return new Date(Date.now());
};
//# sourceMappingURL=defined.js.map