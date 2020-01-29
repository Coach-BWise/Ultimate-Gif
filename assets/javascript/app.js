
$(document).ready(function() {

    let gifs = ["harry potter", "star wars", "despicable me"];
    

    function updateBtns(){
        $('#btnDiv').empty();
        for(let i = 0; i<gifs.length; i++){
            //$('#btnDiv').append($('<button class="gif-btn m-3" data-name="' + gifs[i] + '">').text(gifs[i])); as a literal below 
            $('#btnDiv').append($(`<button class= "gif-btn m-3" data-name ='${gifs[i]}'>`).text(gifs[i])); 
        }
    }

    updateBtns();

    //This function adds a button based on users input
    $('#submit').on('click', function(){
        //prevents the submit from refreshing the page
        event.preventDefault();

        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        //if statement prevents blank buttons from creating
        if(gif === ""){
            return false
        } else{
            //adds to the gifs arr
            gifs.push(gif);

            //add new submission to buttons
            updateBtns();

            //clears the users text on submit
            $("#gif-input").val('');
        }
    })
    
    $(document.body).on("click", ".gif-btn", function(){
        
        let search = $(this).attr("data-name");
        const apiKey = '1gzgGXGYtfcVsYnBK12nRCH9oUXwrAeX';
        let queryUrl = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}&limit=10`;
        
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response){
            let results = response.data;
        
            for(let i = 0; i<results.length; i++){
            
                let gifDiv = $('<div class="float-left mx-1">');
                let p = $('<p>').text(`Rating: ${results[i].rating}`);
                let gifImg = $(`<img src= ${results[i].images.fixed_height.url}>`);
                gifDiv.append(gifImg);
                gifDiv.append(p);
                $('#results').prepend(gifDiv);
                
            }
        })
    });
})