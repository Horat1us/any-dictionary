(function () {
    new ClipboardJS('.btn-copy', {
        target: function(trigger) {
            return trigger.parentElement.parentElement.querySelector('input');
        }
    });
})();
