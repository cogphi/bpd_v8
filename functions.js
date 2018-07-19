











    function myMouseTracker() {
        // Clear tracking variables (not really neccessary)
        xpos = 0; ypos = 0; timefinal = 0;
        xposstore = []; yposstore = []; timestamp = [];
        mousePos = 0;

        var start_time = (new Date()).getTime();

        document.addEventListener('mousemove', mouseCoords);

          function mouseCoords(e) {
            xpos = e.pageX;
            ypos = e.pageY;
            // Another way, using an object
              mousePos = {
                x: e.pageX,
                y: e.pageY
              };
            };

        var record = setInterval(getMousePosition, 100);
          // for granularity, probably need to make 10ms
          function getMousePosition() {
            var pos = mousePos;

            var cur_time = (new Date()).getTime();
            var time = cur_time - start_time;

            if (!pos) {
            }
            else {
                xposstore.push(xpos);
                yposstore.push(ypos);
                timestamp.push(time);
            }
          }
      };


      function myMouseData(data) {

        //        clearInterval(record);

        // Calculate payout and colour of participant choice
                var yourpayout = 0;
                var yourcolor = "";
                  if (data.button_pressed == "0") {
                    yourpayout = amounta[0];
                    yourcolor = colora[0]
                  };

                  if (data.button_pressed == "2") {
                    yourpayout = amountb[0];
                    yourcolor = colorb[0]
                  };


        //      Set computer payout to 0 and only change it if cooperative option (green or blue) was selected
                var computerpayout = 0;

                  if ((colora[0] == ('green') || colora[0] == ('blue')) && (data.button_pressed == "0")) {
                    computerpayout = yourpayout
                  };
                  if ((colorb[0] == ('green') || colorb[0] == ('blue')) && (data.button_pressed == "2")) {
                    computerpayout = yourpayout
                  };

                var computercolor = "";

                  if ((colora[0] == ('green') || colora[0] == ('blue')) && (computeramount = amounta[0])) {
                    computercolor = colora[0]
                  };
                  if ((colorb[0] == ('green') || colorb[0] == ('blue')) && (computeramount = amountb[0])) {
                    computercolor = colorb[0]
                  };

        // Cooperation = true if computer paid out; i.e. cooperative option chosen
                data.cooperate = (computerpayout > 0);


                /*
                var pos_final;
                pos_final.push({
                  "x": xposstore,
                  "y": yposstore,
                  "timestamp": timestamp
                });
                */

                jsPsych.data.get().addToLast({
                  yourpayout: yourpayout,
                  yourcolor: yourcolor,
                  computerpayout: computerpayout,
                  computercolor: computercolor,
                  xposfinal: xpos,
                  yposfinal: ypos,
                  xposstore: xposstore,
                  yposstore: yposstore,
        //          timefinal: time,
                  timestamp: timestamp,
        // One issue: xpos continues to change so xposfinal is different to xposstore final entry
        // Because xposstore continues to record even shortly after button has been clicked --> data from opensesame suggests slightly similar
        // xpos and ypos are correct: they stop on the click; so going to need to get the setInterval to stop recording / clean after currentevent happens
                  });

                };

// Rewards table
