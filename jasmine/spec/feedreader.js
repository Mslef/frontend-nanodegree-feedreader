/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('all have valid URL', function () {
            // Loop through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
            
            for (var i = 0; i <allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                expect(typeof allFeeds[i].url).toBe("string");
            }
        });
        
        it('all have valid names', function () {
            // Loop through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
            for (var i = 0; i <allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(typeof allFeeds[i].name).toBe("string");
            }
        });
        
    });

    //Testing the menu
    describe('The menu', function() {
        var lefAlignValue, menuFontSize;

        it('is hidden by default', function () {
            // Test that the left position menu is -12 times its font size on load to hide it
            lefAlignValue = Number($(".menu").css("transform").slice(19, -4));
            menuFontSize = Number($(".menu").css('font-size').slice(0,-2));
            expect(lefAlignValue<=-12*menuFontSize).toBe(true);

        });

        // Ensure the menu changes visibility when the menu icon is clicked
        describe('when clicked,', function() {
            
            // Replicate the action of clicking the button and wait 1 second
            beforeEach(function(done) {
                $('body').toggleClass('menu-hidden');
                setTimeout(function() {  
                    done();
                }, 1000);
            }); 

            // Test the menu display when clicked
            it('becomes visible if it was hidden', function (done) {         
                lefAlignValue = Number($(".menu").css("transform").slice(19, -4));   
                expect(lefAlignValue).toBe(0);
                done();
            });

            // Test the menu hides when it is clicked again
            it('becomes invisible if it was visible', function (done) {
                lefAlignValue = Number($(".menu").css("transform").slice(19, -4));
                menuFontSize = Number($(".menu").css('font-size').slice(0,-2));
                expect(lefAlignValue<=-12*menuFontSize).toBe(true);
                done();    
            });  
        });
    });

    //Testing initial entries
    describe('Initial Entries', function() {

        //Randomly load a feed after 1 second
        beforeEach(function(done) {
                var randIndex = Math.floor(Math.random() * 4);
                loadFeed(randIndex);
                setTimeout(function() {  
                    done();
                }, 1000);
            });

        // Test that the .entry element contains at least 1 element, and that it is located inside the feed element
        it('show at least one entry', function (done) {
            expect($('.feed').children().length>=1).toBe(true);
            expect($('.entry').length>=1).toBe(true);
            done();
        });
    });


    //Testing behavior while selecting new feed
    describe('New Feed Selection', function() {

        function getFeedContent (inputVariable) {
            $('.entry').each(function(){
                inputVariable.push($(this).text());
            });
        }

        var feedContent = [], newFeedContent = []; 
        
        beforeEach(function(done) {
                // Get the original feeds' contents
                getFeedContent(feedContent);

                // randomly select a feed other than the default one
                var randIndex = Math.floor(Math.random() * 4);
                //console.log(randIndex);
                loadFeed(randIndex);
                setTimeout(function() {  
                    done();
                }, 1000);
            });

        it('changes the content of the visible feed', function () {

            //Check that the new content is different than feedContent
            getFeedContent(newFeedContent);
            for (var i =0; i < feedContent.length; i++) {
                expect(feedContent[i] === newFeedContent[i]).toBe(false);
            }
          
        });
    }); 

    //Extra tests
    describe('New feeds', function() {

        // Test new feeds are properly added to the end of allFeeds
        it('can be added', function(){
            addFeed('Test Feed','https://www.apple.com/ca/hotnews/feeds/ticker.rss');
            expect(allFeeds[allFeeds.length-1].name).toBe('Test Feed');
            expect(allFeeds[allFeeds.length-1].url).toBe('https://www.apple.com/ca/hotnews/feeds/ticker.rss');
        });

    });

    describe('Flags', function() {

        beforeEach(function(done) {
            var randIndex = Math.floor(Math.random() * 4);
            flagFeed(randIndex);
            setTimeout(function() {  
                done();
            }, 1000);
        });

        // Test flags can be applied to feeds by adding the class flagged to feeds
        it('can be applied to feeds', function(done){
            expect($('.flagged').length >= 1).toBe(true);
            expect($('.flagged').css('background-color')).toBe('05cc00');
            done();
        });
    });
   
}());
