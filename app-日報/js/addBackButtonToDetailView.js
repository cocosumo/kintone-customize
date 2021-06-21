(function() {
    "use strict";

    kintone.events.on('app.record.detail.show', function(event) {

        let appId = event.appId;
        let URL = `https://rdmuhwtt6gx7.cybozu.com/k/${appId}/ `;

        // Create a button
        let myRecordButton = document.createElement('button');
        myRecordButton.id = 'backButton';
        myRecordButton.innerHTML = ' ⇐ 戻る';

        // Set the button on the header
        kintone.app.record.getHeaderMenuSpaceElement().appendChild(myRecordButton);
        
        /* Navigate to list view */
        myRecordButton.onclick = function(){
          window.location.href = URL;
        };
    });
})();