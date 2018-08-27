
import _ from 'underscore';

$(document).ready(function(){

    let user = [];
    let json = [];
    var userList = $('.--row-users');
    var modalContent = $('.--modalContent');
    const apiURL = 'https://jsonplaceholder.typicode.com/users';


    $.fn.Init = (item) => {
        
        $(item).removeClass('fa-envelope').addClass('fa-spinner fa-spin');

        $.getJSON(apiURL, (data) => {
            
            json = data;

            $.fn.printList(json);

            //console.log(json)

            $(item).removeClass('fa-spinner fa-spin').addClass('fa-envelope');

        }).then( res => {
            //const data = JSON.stringify(res);
            json = res;

            return json;
            //return console.log(json);
        }).catch(err => {
            userList.empty();
            userList.append(`
            <li class='media'>
            <div class='alert alert-danger'>Error while fetching data. 
            <button type='button' class='btn btn-danger btn-sm btnfetchData'>Retry</button>
            </div>
            </li>`)
            $(item).removeClass('fa-spinner fa-spin').addClass('fa-times');
        });
    };


    $.fn.Details = (id) => {
        
        $.getJSON(apiURL + '/' + id, (data) => {

        }).then( res => {
            json = res;
            
            modalContent.empty();
            modalContent.append(`
            <div class="panel panel-default">
            <div class="panel-heading">
            <h4 class="panel-title">User profile</h4>
            </div>
            <div class="panel-body">
              <div class="profile__avatar">
                <img src="https://api.adorable.io/avatars/285/${json.email}.png" alt="...">
              </div>
              <div class="profile__header">
                <h4>${json.name} <small>${json.username}</small></h4>
                <p class="text-muted">
                ${json.email}
                </p>
                <p>
                  <a href="http://${json.website}/" target="_blank">${json.website}</a>
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
                    <td>${json.address.city}, ${json.address.street} ${json.address.suite}</td>
                  </tr>
                  <tr>
                    <th><strong>Phone</strong></th>
                    <td>${json.phone}</td>
                  </tr>
                  <tr>
                    <th><strong>Company name</strong></th>
                    <td>${json.company.name}</td>
                  </tr>
                  <tr>
                    <th><strong>Description</strong></th>
                    <td>${json.company.catchPhrase}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`)          
        }).catch(err => {
            modalContent.empty();
            modalContent.append(`
            <li class='media'>
            <div class='alert alert-danger'>Error while fetching data. 
            <button type='button' class='btn btn-danger btn-sm btnfetchData'>Retry</button>
            </div>
            </li>`)
        });

    };

  
    /*$.fn.fetchData = function(item){
        $(item).removeClass('fa-envelope').addClass('fa-spinner fa-spin');
        fetch(apiURL)
        .then(response => response.json())
        .then(json => {
            
            users = json

            $(item).removeClass('fa-spinner fa-spin').addClass('fa-envelope');
           
            $.fn.printList(users);

            return users;
        })
        .catch(err => err.json()).catch(err=>{
            userList.empty();
            userList.append(`
            <li class='media'>
            <div class='alert alert-danger'>Error while fetching data. 
            <button type='button' class='btn btn-danger btn-sm btnfetchData'>Retry</button>
            </div>
            </li>`)
            $(item).removeClass('fa-spinner fa-spin').addClass('fa-times');
        });
    }
     */

  /*   $.fn.printList = function(data){

       userList.empty();
        
        $.each(data, function (index, value) {
            userList.append(`
            <li class="media">
                <div class="media-left">
                <a href="#">
                    <img class="media-object" src="${value.picture.medium}" width='65' height='65'>
                </a>
                </div>
                <div class="media-body">
                <h4 class="media-heading">${value.name.first} ${value.name.last}</h4>
                <span>${value.email}</span>
                </div>
            </li>`);
        });
    } */



    $.fn.printList = function(data){

        userList.empty();
         
         $.each(data, function (index, value) {
             userList.append(`
             <div class="col-md-6 col-lg-4">
             <div class="card hover-shadow">
               <div class="flexbox align-items-center px-20 pt-20">
                 <div class="dropdown">
                   <a data-toggle="dropdown" href="#" aria-expanded="false"><i class="ti-more-alt rotate-90 text-muted"></i></a>
                   <div class="dropdown-menu dropdown-menu-right">
                     <a class="dropdown-item" href="#"><i class="fa fa-fw fa-user"></i> Profile</a>
                     <a class="dropdown-item" href="#"><i class="fa fa-fw fa-comments"></i> Messages</a>
                     <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="#"><i class="fa fa-fw fa-download"></i> Download Resume</a>
                   </div>
                 </div>
               </div>
         
               <div class="card-body text-center pt-1 pb-20">
                 <a href="#" data-id="${value.id}" class="--see-details" data-toggle="modal" data-target="#myModal">
                   <img class="avatar avatar-xxl" src="https://api.adorable.io/avatars/285/${value.email}.png">
                 </a>
                 <h5 class="mt-2 mb-0"><a class="hover-primary --see-details" data-toggle="modal" data-target="#myModal" href="#" data-id="${value.id}">${value.name}</a></h5>
                 <span>${value.email}</span>
                 <div class="mt-20">
                    <button type="buton" class="btn btn-primary btn-xs --see-details" data-id="${value.id}" data-toggle="modal" data-target="#myModal">Details</button>
                 </div>
               </div>
         
               <footer class="card-footer flexbox">
                 <div>
                   <i class="fa fa-map-marker pr-1"></i>
                   <span>${value.address.city + ', '+value.address.street}</span>
                 </div>
                 <div>
                 </div>
               </footer>
             </div>
           </div>`);
         });
     }


    $(document).on('click','.btnfetchData',function(){

        let $this = $(this)[0].children[0];

        $.fn.Init($this);

    });


    $(document).on('click','.--see-details',function(){

        let id = $(this)[0].dataset.id;
               
        $.fn.Details(id);

    });

 /*    $(document).on('click','.btnsortEmail',function(){

        let $this = $(this)[0].children[0];

        let data = _.sortBy($.fn.fetchData($this), function(sort){ 
            return sort.email; 
        });

        $.fn.printList(data);

    }); */

});

