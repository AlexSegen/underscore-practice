import _ from "underscore";

let json = [];
var userList = $(".--row-users");
var modalContent = $(".--modalContent");
var modalFooter = $(".--modalFooter");
const apiURL = "https://jsonplaceholder.typicode.com/users";

$.fn.Init = function(item) {
  $(item)
    .removeClass("fa-envelope")
    .addClass("fa-spinner fa-spin");

  $.getJSON(apiURL, data => {
    json = data;

    $.fn.loadData();

    $.fn.printList(json);

    let msg = "Datos cargados con éxito";
    let type = "alert-success";
    $.fn.printMsg(type, msg);

    $(item)
      .removeClass("fa-spinner fa-spin")
      .addClass("fa-envelope");
  }).catch(err => {
    userList.empty();
    userList.append(`
            <li class='media'>
            <div class='alert alert-danger'>Error while fetching data: ${
              err.message
            } 
            <button type='button' class='btn btn-danger btn-sm btnfetchData'>Retry</button>
            </div>
            </li>`);
    $(item)
      .removeClass("fa-spinner fa-spin")
      .addClass("fa-times");
  });
};

$.fn.loadData = () => {
  return json;
};

$.fn.sortBy = function(arg, active) {
  if (active == "ASC") {
    var x = _.sortBy($.fn.loadData(), arg);
  } else if (active == "DESC") {
    var x = _.sortBy($.fn.loadData(), arg).reverse();
  }

  $.fn.printList(x);
};

$.fn.findFirst = function(id) {
  var data = $.fn.loadData();

  var x = _.find(data, function(find) {
    return find.id == id;
  });

  $.fn.printDetails(x);
};

$.fn.printDetails = function(value) {
  //var data = $.fn.loadData();

  modalContent.empty();
  modalFooter.empty();

  modalContent.append(`
        <div class="panel panel-default">
        <div class="panel-heading">
        <h4 class="panel-title">User profile</h4>
        </div>
        <div class="panel-body">
          <div class="profile__avatar">
            <img src="https://api.adorable.io/avatars/285/${
              value.email
            }.png" alt="...">
          </div>
          <div class="profile__header">
            <h4>${value.name} <small>${value.username}</small></h4>
            <p class="text-muted">
            ${value.email}
            </p>
            <p>
              <a href="http://${value.website}/" target="_blank">${
    value.website
  }</a>
            </p>
          </div>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
        <h4 class="panel-title">User info</h4>
        </div>
        <div class="panel-body">
          <table class="table profile__table">
            <tbody>
              <tr>
                <th><strong>Location</strong></th>
                <td>${value.address.city}, ${value.address.street} ${
    value.address.suite
  }</td>
              </tr>
              <tr>
                <th><strong>Phone</strong></th>
                <td>${value.phone}</td>
              </tr>
              <tr>
                <th><strong>Company name</strong></th>
                <td>${value.company.name}</td>
              </tr>
              <tr>
                <th><strong>Description</strong></th>
                <td>${value.company.catchPhrase}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`);
  modalFooter.append(`
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger --btn-delete" data-id="${
          value.id
        }">Delete</button>
      `);
  //});

  $("#myModal").modal("show");
};

$.fn.printList = function(data) {
  userList.empty();

  $.each(data, function(index, value) {
    userList.append(`
             <div class="col-md-6 col-lg-4" data-user="${value.id}">
             <div class="card hover-shadow">        
               <div class="card-body text-center pt-1 pb-20">
                 <a href="#" data-id="${
                   value.id
                 }" class="--see-details" data-toggle="modal" data-target="#myModal">
                   <img class="avatar avatar-xxl" src="https://api.adorable.io/avatars/285/${
                     value.email
                   }.png">
                 </a>
                 <h5 class="mt-2 mb-0"><a class="hover-primary --see-details" data-toggle="modal" data-target="#myModal" href="#" data-id="${
                   value.id
                 }">${value.name}</a></h5>
                 <span>${value.email}</span>
                 <div class="mt-20">
                    <button type="buton" class="btn btn-primary btn-xs --see-details" data-id="${
                      value.id
                    }">Details</button>
                 </div>
               </div>
         
               <footer class="card-footer flexbox">
                 <div>
                   <i class="fa fa-map-marker pr-1"></i>
                   <span>${value.address.city +
                     ", " +
                     value.address.street}</span>
                 </div>
                 <div>
                 </div>
               </footer>
             </div>
           </div>`);
  });
};

$.fn.Delete = function(id) {
  //var data = $.fn.loadData();
  //data.splice(_.findIndex(data, _.find(data, function (filter, index) { return filter.id == id; })), 1);

  $("[data-user='" + id + "']").remove();

  $("#myModal").modal("hide");

  /*   let msg = "Eliminado con éxito";
  let type = "alert-danger";
  $.fn.printMsg(type, msg); */
};

$.fn.printMsg = function(type, msg) {
  $(".--alert-response")
    .removeAttr("class")
    .addClass("--alert-response alert " + type)
    .text(msg)
    .fadeIn("fast");

  setTimeout(() => {
    $(".--alert-response").fadeOut("fast");
  }, 3000);
};

$(document).on("click", ".btnfetchData", function() {
  let $this = $(this).children("i");
  $.fn.Init($this);
});

$(document).on("click", ".--see-details", function() {
  let id = $(this).data("id");
  $.fn.findFirst(id);
});

$(document).on("click", ".--btn-delete", function() {
  let id = $(this).data("id");

  if (confirm("Are you sure?")) {
    $.fn.Delete(id);
  }
});

$(document).ready(() => {
  $(document).on("click", ".--sortBy", () => {
    var sorting = $(this).data("sort");
    var $this = $(this).data("active");

    var asc = "ASC";
    var desc = "DESC";

    if ($this == "false") {
      $(".--sortBy").attr("data-active", "false");
      $(this).attr("data-active", "true");
      $.fn.sortBy(sorting, asc);
    } else {
      $(this).attr("data-active", "false");
      $.fn.sortBy(sorting, desc);
    }
  });

  $.fn.Init();
});
