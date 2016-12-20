var $newIdeaTitle, $newIdeaBody;

$(document).ready( function(){

  renderAllIdeas();

  $newIdeaTitle = $("#new-idea-title");
  $newIdeaBody = $("#new-idea-body");

  $("#submit-idea").on("click", createIdea);
})

function renderAllIdeas(){
  $.getJSON("/api/v1/ideas")
  .then( function(ideas){
    ideas.forEach(renderIdea)
  } )
}

function createIdea(){
  $.post("/api/v1/ideas", gatherIdeaData())
  .then( renderIdea )
  .then( clearNewIdeaValues )
}

function gatherIdeaData(){
  return { idea: {
        title: $newIdeaTitle.val(),
        body: $newIdeaBody.val(),
      }
    }
}

function renderIdea(idea){
  $("#ideas-list").append( ideaHTML(idea) )


  attachEditEvents(idea);
}

function attachEditEvents(idea){
  $(`#idea-${idea.id}`).find(".idea-title").on("focusout", gatherIdeaTitle)
  $(`#idea-${idea.id}`).find(".idea-body").on("focusout", gatherIdeaBody)
  $(`#idea-${idea.id}`).find(".upgrade-quality").on("click", upgradeQuality)
  $(`#idea-${idea.id}`).find(".downgrade-quality").on("click", downgradeQuality)
}

function upgradeQuality(){
  var quality = $(this).parent().siblings(".idea-quality").text()

  if (quality === "plausible") { quality = "genius"};
  if (quality === "swill") { quality = "plausible"};

  var ideaData = {
    idea: {
      quality: quality
    },
    id: $(this).closest(".idea").data("id")
  }

  updateIdea(ideaData)

}

function downgradeQuality(){

}


function gatherIdeaTitle(){
 var ideaData = { idea: {
   title: $(this).text()
 },
 id: $(this).closest(".idea").data("id")
}
updateIdea(ideaData)
}

function gatherIdeaBody(){
 var ideaData = {idea: {
     body: $(this).text()
   },
    id: $(this).closest(".idea").data("id")
  }
  updateIdea(ideaData)
}

function updateIdea(data){

  $.ajax({
    url: `/api/v1/ideas/${data.id}`,
    method: "put",
    data: data
  })
}

function ideaHTML(idea){
  return `
    <div class='idea' id='idea-${idea.id}' data-id=${idea.id} >
      <p class='idea-title' contenteditable=true >${idea.title}</p>
      <p class='idea-body' contenteditable=true >${idea.body}</p>
      <p class='idea-quality'>${idea.quality}</p>
      <p class='idea-options'>
        <button class='upgrade-quality'>+</button>
        <button class='downgrade-quality'>-</button>
        <button>delete</button>
      </p>
    <div>
    `
}

function clearNewIdeaValues() {
  $newIdeaTitle.val("")
  $newIdeaBody.val("")
}
