console.log("hi");

function getResults() {
  $(".results").empty();
  $.getJSON("/all", function(data) {
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i]._id, data[i].link);
      $(".results").append(
        `<div id="dataContainer"><p class='data-entry' data-id='${
          data[i]._id
        }'><a href='${data[i].link}' target="_blank">${
          data[i].title
        }  </a><span id=save><i class="fas fa-arrow-alt-circle-down"></i></span></p></div><br>`
      );
    }
  });
}

getResults();

function getSavedResults() {
  $(".savedResults").empty();
  $.getJSON("/all-saved", function(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].description !== undefined) {
        $(".savedResults").prepend(
          `<div id="dataContainer"><p class='data-entry' data-id='${
            data[i]._id
          }'><a href='${data[i].link}' target="_blank">${
            data[i].title
          }  </a><span id=delete><i class="fas fa-trash"></i></span>  <span id="note"><i class="fas fa-sticky-note"></i></span></p><p>${
            data[i].description
          }</p></div><br>`
        );
        // if (data[i].description !== undefined) {
        //   $(".savedResults").prepend(
        //     `<p>${data[i].description}</p>`
        //   )
      } else {
        $(".savedResults").prepend(
          `<div id="dataContainer"><p class='data-entry' data-id='${
            data[i]._id
          }'><a href='${data[i].link}' target="_blank">${
            data[i].title
          }  </a><span id=delete><i class="fas fa-trash"></i></span>  <span id="note"><i class="fas fa-sticky-note"></i></span></p></div><br>`
        );
      }
    }
  });
}

getSavedResults();

// save an article function
$(document).on("click", "#save", function() {
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/save/" + selected.attr("data-id"),

    success: function(response) {
      selected.remove();
      getResults();
    }
  });
});

// delete an article function
$(document).on("click", "#delete", function() {
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/delete/" + selected.attr("data-id"),

    success: function(response) {
      console.log(selected);
      selected.remove();
      getSavedResults();
    }
  });
});

$(document).on("click", "#note", function() {
  var selected = $(this).parent();
  $("#title").empty();
  $(".hidden").removeClass();
  console.log(selected.attr("data-id"));
  $.ajax({
    type: "GET",
    url: "/find/" + selected.attr("data-id"),
    success: function(data) {
      console.log(data);
      // Fill the inputs with the data that the ajax call collected
      console.log(data._id);
      console.log(data.title);
      $("#id").val(data._id);
      $("#title").html(data.title);
      // $("#action-button").html("<button id='updater' data-id='" + data._id + "'>Update</button>");
    }
  });
});
