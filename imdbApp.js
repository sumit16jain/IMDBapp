$("document").ready(() => {
	
	// Hiding the loader
	$(".loader").hide();

	// Start of Main Page

	// On Page Opened title should be selected.
	$("#T").addClass("mp-click");

	// On Main Page Display contents of title only.
	$("#title").css("display", "block");
	$("#year").css("display", "none");
	$("#id").css("display", "none");


	// Reload the entire page and skips to Main page to remove previously entered data.
	$(".main-title").click(() => {
		location.reload();
	});

	// on title click open title search input and close others
	$("#T").click(() =>{
		$("#title").css("display", "block");
		$("#T").addClass("mp-click");
		
		$("#year").css("display", "none");
		$("#Y").removeClass("mp-click");

		$("#id").css("display", "none");
		$("#I").removeClass("mp-click");
	});

	// on title 'n' year click open title and year search input and close others
	$("#Y").click(() =>{
		$("#year").css("display", "block");
		$("#Y").addClass("mp-click");

		$("#title").css("display", "none");
		$("#T").removeClass("mp-click");

		$("#id").css("display", "none");
		$("#I").removeClass("mp-click");
	});

	// on id click open id search input and close others.
	$("#I").click(() =>{
		$("#id").css("display", "block");
		$("#I").addClass("mp-click");

		$("#title").css("display", "none");
		$("#T").removeClass("mp-click");

		$("#year").css("display", "none");	
		$("#Y").removeClass("mp-click");	
	});

	// End of Main Page




	// Start of Second Page.

	// On Second Page opening add class to opened tab
	$("#c-one,#c-two").addClass("click");

	// On Second Page Displaying only casting and hiding others
	$("#cns").css("display", "block");
	$("#im").css("display", "none");
	$("#more").css("display", "none");

	// On Second Page On Click Casting Details(reel) tab
	$("#c-one,#c-two").click(() =>{
		$("#cns").css("display", "block");
		$("#c-one,#c-two").addClass("click");


		$("#im").css("display", "none");
		$("#i-one,#i-two").removeClass("click");

		$("#more").css("display", "none");
		$("#m-one,#m-two").removeClass("click");
	});

	// On Second Page On Click IMDB DETAILS(i) tab
	$("#i-one,#i-two").click(() =>{
		$("#im").css("display", "block");
		$("#i-one,#i-two").addClass("click");
		
		$("#cns").css("display", "none");
		$("#c-one,#c-two").removeClass("click");
		
		$("#more").css("display", "none");
		$("#m-one,#m-two").removeClass("click");
	});

	// On Third Page On Click MORE(...) tab
	$("#m-one,#m-two").click(() =>{
		$("#more").css("display", "block");
		$("#m-one,#m-two").addClass("click");

		$("#cns").css("display", "none");
		$("#c-one,#c-two").removeClass("click");
		
		$("#im").css("display", "none");	
		$("#i-one,#i-two").removeClass("click");
	});


	// Main Page data is taken one search click.
	$("#search-title").click(() => {
		// if input field is empty
		if($('#search1').val() == ''){
      		alert('Input can not be left blank');
   		}else{
   			// Taking the value of input and calling function with value as parameter.
   			var title = document.getElementById("search1").value;
   			console.log(title);
			getresponse(title, 1);
   		}
	});


	$("#search-year").click(() => {
		// If input field is empty
		if($('#search2-one').val() == '' && $("#search2-two").val() !== ''){
      		alert("Title Can't be blank");
   		} else if($('#search2-one').val() !== '' && $("#search2-two").val() == ''){
   			alert("Year Can't be blank");
		} else if($('#search2-one').val() == '' && $("#search2-two").val() == ''){
			alert("Please fill both Title & Year");
		} else{
			// Taking the value of input and calling function with value as parameter.
			var title = document.getElementById("search2-one").value;
			var year = document.getElementById("search2-two").value;
			getresponse(title, year);
		}
	});

	$("#search-id").click(() => {
		// If input value is empty
		if($('#search3').val() == ''){
			alert("Imdb id can't be blank");
		} else{
			// Taking the value of input and calling function with value as parameter.
			var id = document.getElementById("search3").value;
			getresponse(id, 2);
		}	
	});
});



let getresponse = (x, num) => {
	// Getting the parameters.
	
	var link = "";

	// if input is title and num is year then link will be updated with the title and year.
	if((x !== undefined && num!== 1) && (x !== undefined && num!== 2)){
		link+=`https://www.omdbapi.com/?t=${x}&y=${num}&apikey=ec77ca9c`;
	}else if(x!== undefined && num === 1) {
		// if input is title and num is 1 then link will be updated with the title.
		console.log(x);
		link+=`https://www.omdbapi.com/?t=${x}&apikey=ec77ca9c`;	
	}
	else if(x!== undefined && num === 2){
		// if input is id and num is 2 then link will be updated with the id.
		link+=`https://www.omdbapi.com/?i=${x}&apikey=ec77ca9c`;
	}
			

		// Getting the response with the above updated link.	
		$.ajax({
		type:"GET",
		url:link,
		success: (response) => {

			// To check if response is true then code inside it will be executed.
			if(response.Response !== "False"){
				// Displays Second Page & hides Main Page
				$(".CP").css("display", "block");
				$(".heading").css("display", "none");

				// TITLE. >/
				if(response.Title !== null && response.Title !== undefined){
					$(".Title").text(response.Title);
				} else{
					console.log(`No title`);
				}

				// TYPE
				if(response.Type !== null && response.Type !== undefined){
					
					$(".movie").text(response.Type);
					
				} else{
					console.log(`No Type Found`);
				}

				// RATED >/
				if(response.Rated !== null && response.Rated !== undefined){
					
					$(".rated").text(response.Rated);
					
				} else{
					console.log("Movie not Rated")
				}

				// Released. >/
				if(response.Released !== null && response.Released !== undefined){
					
					$(".released").text(response.Released);
					
				} else{
					console.log("No Year Found");
				}

				// RUNTIME  >/
				if(response.Runtime !== null && response.Runtime !== undefined){
					
					$(".runtime").text(response.Runtime);
					
				} else{
					console.log(`Runtime Not Found`);
				}

				// LANGUAGE >/
				if(response.Language !== null && response.Language !== undefined){
					
					$(".languages").text(response.Language);
					
				} else{
					console.log(`No Language Found`);
				}

				// GENRE >/
				if(response.Genre !== null && response.Genre !== undefined){
					
					$(".genre").text(response.Genre);
					
				} else{
					console.log(`No Genre Found`);
				}

				// RATINGS >/
				if(response.Ratings !== undefined && response.Ratings.length > 0 ){
					
					// Creating Custom divs to display the ratings
					for(var i = 0; i < response.Ratings.length; i++){
						switch(i){
							case 0: 
									div = document.createElement("div");
									$(div).attr("class", "col-4 col-md-4 "+i);
									$("#j-rate").append(div);
									$(div).html(`<div class="row">
											<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">${response.Ratings[i].Value}</p>		
									 		</div>
									 		<div class="col-12">
									 			<p class="mb-0 p-1 d-flex  d-block text-center">${response.Ratings[i].Source}</p>		
											</div>
									    </div>`);
								break;
							case 1: 
									div = document.createElement("div");
									$(div).attr("class", "col-4 col-md-4 border border-dark border-right-0 border-top-0 border-bottom-0 "+i);
									$("#j-rate").append(div);
									$(div).html(`<div class="row">
											<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">${response.Ratings[i].Value}</p>		
									 		</div>
									 		<div class="col-12 mt-2">
									 			<p class="mb-0 p-1 d-flex justify-content-center align-items-end d-block text-center">${response.Ratings[i].Source}</p>		
											</div>
									    </div>`);
								break;
							case 2: 
									div = document.createElement("div");
									$(div).attr("class", "col-4 col-md-4 border border-dark border-right-0 border-top-0 border-bottom-0 "+i);
									$("#j-rate").append(div);
									$(div).html(`<div class="row">
											<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">${response.Ratings[i].Value}</p>		
									 		</div>
									 		<div class="col-12 mt-2">
									 			<p class="mb-0 p-1 d-block text-center">${response.Ratings[i].Source}</p>		
											</div>
									    </div>`);
								break;
						}
					}
				} else{
					// If Rating's array is empty
					for(var i = 0; i < 3; i++){
						switch(i){
							case 0: 
									div = document.createElement("div");
									$(div).attr("class", "col-4 col-md-4 "+i);
									$("#j-rate").append(div);
									$(div).html(`<div class="row">
											<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">N/A</p>		
									 		</div>
									 		<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">Internet Movie Database</p>		
											</div>
									    </div>`);
								break;
							case 1: 
									div = document.createElement("div");
									$(div).attr("class", "col-4 col-md-4 border border-dark border-right-0 border-top-0 border-bottom-0 "+i);
									$("#j-rate").append(div);
									$(div).html(`<div class="row">
											<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">N/A</p>		
									 		</div>
									 		<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">Rotten Tomatoes</p>		
											</div>
									    </div>`);
								break;
							case 2: 
									div = document.createElement("div");
									$(div).attr("class", "col-4 col-md-4 border border-dark border-right-0 border-top-0 border-bottom-0 "+i);
									$("#j-rate").append(div);
									$(div).html(`<div class="row">
											<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">N/A</p>		
									 		</div>
									 		<div class="col-12">
									 			<p class="mb-0 p-1 d-block text-center">MetaCritic</p>		
											</div>
									    </div>`);
								break;
						}
					}
				}

				// Poster >/
				if(response.Poster !== null && response.Poster !== undefined){
					
					$(".img-details").attr("src", response.Poster);
					
				} else{
					console.log("Year not found");
				}

				// PLOT  >/
				if(response.Plot !== null && response.Plot !== undefined){
					
					$(".plot").text(response.Plot);
					
				} else{
					console.log(`No Plot Found`);
				}

				// ACTORS  >/
				if(response.Actors !== null && response.Actors !== undefined){
					
					$(".actors").text(response.Actors);
					
				} else{
					console.log(`No Actors Found`);
				}

				// DIRECTOR  >/
				if(response.Director !== null && response.Director !== undefined){
					
					$(".director").text(response.Director);
					
				} else{
					console.log(`No Director Found`);
				}

				// WRITER  >/
				if(response.Writer !== null && response.Writer !== undefined){
					
					$(".writer").text(response.Writer);
					
				} else{
					console.log(`No Writer Found`);
				}

				// YEAR  >/
				if(response.Year !== null && response.Year !== undefined){
					
					$(".year").text(response.Year);
					
				} else{
					console.log("Year not found");
				}

				// IMDBID  >/
				if(response.imdbID !== null && response.imdbID !== undefined){
					
					$(".iid").text(response.imdbID);
					
				} else{
					console.log(`No imdbID Found`);
				}

				// IMDBRATING  >/
				if(response.imdbRating !== null && response.imdbRating !== undefined){
					
					$(".imdb-rating").text(response.imdbRating);
					
				} else{
					console.log(`No imdbRating Found`);
				}
				
				// IMDBVOTES  >/
				if(response.imdbVotes !== null && response.imdbVotes !== undefined){
					
					$(".imdb-votes").text(response.imdbVotes);
					
				} else{
					console.log(`No imdbVotes Found`);
				}
				
				// METASCORE  >/
				if(response.Metascore !== null && response.Metascore !== undefined){
					
					$(".metascore").text(response.Metascore);
					
				} else{
					console.log(`No Metascore Found`);
				}
				
				//COUNTRY  >/
				if(response.Country !== null && response.Country !== undefined){
					
					$(".country").text(response.Country);
					
				} else{
					console.log(`No Country Found`);
				}

				// AWARDS  >/
				if(response.Awards !== null && response.Awards !== undefined){
					
					$(".awards").text(response.Awards);
					
				} else{
					console.log(`No Genre Found`);
				}
		
				// Checking Type  >/
				if(response.Type === "movie"){

					// Creating Custom divs if the type is movie
					for(var i = 0; i < 4; i++){
						switch(i) {
							case 0: div = document.createElement("div");
									$(div).attr("class", "row "+i);
									$("#mve").append(div);
									$(div).html(`<div class="col-4">
												<p class="mb-0 p-2 font-weight-bold">DVD: </p>
											</div>
											<div class="col-8">
												<p class="mb-0 p-2">${response.DVD}</p>
											</div>`);
								break;

							case 1: div = document.createElement("div");
									$(div).attr("class", "row "+i);
									$("#mve").append(div);
									$(div).html(`<div class="col-4">
												<p class="mb-0 p-2 font-weight-bold">BoxOffice: </p>
											</div>
											<div class="col-8">
												<p class="mb-0 p-2">${response.BoxOffice}</p>
											</div>`);
								break;

							case 2: div = document.createElement("div");
									$(div).attr("class", "row "+i);
									$("#mve").append(div);
									$(div).html(`<div class="col-4">
												<p class="mb-0 p-2 font-weight-bold">Production: </p>
											</div>
											<div class="col-8">
												<p class="mb-0 p-2">${response.Production}</p>
											</div>`);
								break;

							case 3: div = document.createElement("div");
									$(div).attr("class", "row "+i);
									$("#mve").append(div);
									// WEBSITE
									if(response.Website !== null && response.Website !== undefined){
										if(response.Website === "N/A"){
											$(div).html(`<div class="col-4">
												<p class="mb-0 p-2 font-weight-bold">Website: </p>
											</div>
											<div class="col-8">
												<p class="mb-0 p-2">${response.Website}</p>
											</div>`);
										} else{
											
											$(div).html(`<div class="col-4">
												<p class="mb-0 p-2 font-weight-bold">Website: </p>
											</div>
											<div class="col-8">
												<p class="mb-0 p-2 text-truncate font-weight-bold"><a href="${response.Website}" class="text-primary" target="_blank">${response.Website}</a></p>
											</div>`);
										}
									} else{
										console.log(`No Website Found`);
									}
								break;
						}	
					}
				}
				// displaying seasons if the type is series	
				 else{
					div = document.createElement("div");
					$(div).attr("class", "row");
					$("#mve").append(div);
					$(div).html(`<div class="col-4">
							<p class="mb-0 p-2 font-weight-bold">Total Seasons: </p>
						</div>
						<div class="col-8">
							<p class="mb-0 p-2 text-truncate">${response.totalSeasons}</p>
					</div>`);
				}
			}

			// Displaying no movie in case response is false
			else{
				// Showing the error page and hiding Main and Second Page.
				$(".CP").css("display", "none");
				$(".heading").css("display", "none");
				$(".error").css("display", "block");
				console.log("No movie exists");
			}
		},

		timeout:5000,

		error: (request, errorType, errorMessage) => {
			 if(errorType==="timeout") {
			 	$(".time-out").show();
	            
	        } else {
	            console.log("success");
	        }
		},

		beforeSend: () => {
			$(".heading").hide();
			$(".loader").show();
			console.log("Sending Req");
		},
		complete : () => {
                // $('.profile').show();
                $('.loader').hide();

      }
	});
}

