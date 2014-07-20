(function ( $ ) {

    $.fn.prettyCal = function(options) {

        var settings = $.extend({
            // These are the defaults.
            calendarId:  'sg9v2j308m74qglr9snq153omc@group.calendar.google.com',
            fields: "white"
        }, options );
        console.log(settings);
        console.log(window.gapi);
        calendarList.load(settings);
        return this;
    };

    
    var responseJSON;
    var calendarList= {

        load: function (settings) {
            console.log(settings);
          window.gapi.client.setApiKey('AIzaSyBeNNVIUttvJ-n1rT5go8ljXMX8kJwAFhU');
            window.gapi.client.load('calendar', 'v3', function () {
                    calendarList.makeRequest(settings);
                });
        },

        makeRequest: function (settings) {

            var request = gapi.client.calendar.events.list({
                'calendarId' : settings.calendarId,
                'fields': 'items(anyoneCanAddSelf,attendeesOmitted,colorId,created,description,end,endTimeUnspecified,etag,guestsCanInviteOthers,guestsCanModify,guestsCanSeeOtherGuests,hangoutLink,htmlLink,iCalUID,id,kind,location,locked,originalStartTime,privateCopy,recurringEventId,sequence,start,status,summary,transparency,updated,visibility)'
            });

            request.execute(function(response) {
                console.log(response);
                responseJSON = response;
                calendarList.appendResults(response);
            });
        },

        appendResults: function (text) {
            var results = $('#results');
            results.append('<table id="cal-list"> </table>');
            var table = $('#cal-list');

            var i = 0,
                textToInsert = [];
            for(j in text.items){
                console.log(j);
                console.log(text.items[j]);

                textToInsert[i++] = '<tr><td name="pieTD">';
                textToInsert[i++] = text.items[j].summary ? text.items[j].summary : "null";
                textToInsert[i++] = '</td> <td>'
                textToInsert[i++] = text.items[j].description ? text.items[j].description : "null";
                textToInsert[i++] = '</td> </tr>' ;
            }
            table.append(textToInsert.join(""));
        }
    };



}( jQuery ));