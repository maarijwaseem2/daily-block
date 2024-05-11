// show hide top alerts

$(document).ready(function () {
  var alertElement = $(".top-alert");
  var successIcon = $(".success-icon", alertElement);
  var errorIcon = $(".error-icon", alertElement);
  var successMessage = $(".success-message", alertElement);
  var errorMessage = $(".error-message", alertElement);
  var closeButton = $(".alert-btn", alertElement);

  closeButton.click(function () {
    alertElement.hide();
  });

  if (alertElement.hasClass("success")) {
    successIcon.show();
    errorIcon.hide();
    successMessage.show();
    errorMessage.hide();
  } else if (alertElement.hasClass("error")) {
    successIcon.hide();
    errorIcon.show();
    successMessage.hide();
    errorMessage.show();
  }
});

// show/hide dropdowns while clicking outside

$(document).ready(function () {
  $(".dropdown-trigger").on("click", function () {
    var dropdownId = $(this).data("dropdown");
    var $dropdownContent = $("#" + dropdownId);

    // Hide other dropdowns
    $(".dropdown-content").not($dropdownContent).slideUp();

    // Toggle the clicked dropdown
    $dropdownContent.slideToggle(200);
  });

  // Hide dropdowns when clicking outside of them
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".dropdown-trigger, .dropdown-content").length
    ) {
      $(".dropdown-content").slideUp(200);
    }
  });
});

// sidebar toggle button

$(document).ready(function () {
  if ($("body").width() >= 991) {
    $(".sidebar-toggle").click(function (e) {
      e.preventDefault();
      $(".dashboard-inner-wrap").toggleClass("toggled");
    });
  }
});


// mobile sidebar toggle + close sidebar while clicking outside

$(document).ready(function () {
  $(".mobile-toggle").click(function () {
    $(".sidebar-wrap").css("left", "0");
    $(".dashboard-inner-wrap").toggleClass("expanded");
  });

  $(".toggle-btn-desktop").click(function () {
    $(".sidebar-wrap").css("left", "-100%");
    $(".dashboard-inner-wrap").removeClass("expanded");
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".sidebar-wrap, .mobile-toggle").length) {
		$(".sidebar-wrap").css("left", "-100%");
      $(".dashboard-inner-wrap").removeClass("expanded");
    }
  });

});


// show/hide password

if (jQuery("form input")) {
	var password_icon = jQuery(".form-field i");
	var password_field = jQuery(".password");
	
	password_icon.on('click', function () {
	  let type = jQuery(this).siblings(".password").attr('type') === 'password' ? 'text' : 'password';
  
	  jQuery(this).siblings(".password").attr('type', type);
	  this.classList.toggle('fa-eye');
	  this.classList.toggle('fa-eye-slash');
	});
}


// top search bar focus and close on clicking outside

$(document).mouseup(function(e) {
  var searchButton = $('#search');

  // If the clicked element is not the search button
  if (!searchButton.is(e.target) && searchButton.has(e.target).length === 0) {
    // Remove the expanded class
    $('.search-bar').removeClass("expanded");
  }
});

$('#search').click(function() {
  $('.search-bar').toggleClass("expanded");
});



// topbar input search toggle + overlay

$(document).ready(function() {
  // Function to toggle overlay class on #content-wrap
  function toggleOverlay() {
    $('.content-wrap').toggleClass('overlay');
  }

  // Function to toggle search results visibility
  function toggleSearchResults() {
    $('.search-results').slideToggle(150);
  }

  // Click event on #search to toggle overlay on #content-wrap and slide toggle .search-results
  $('#search').on('click', function() {
    toggleOverlay();
    toggleSearchResults();
  });

  // Click event on document to hide overlay and search results when clicking outside #search
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#search').length && !$(e.target).closest('.search-results').length) {
      $('.content-wrap').removeClass('overlay');
      $('.search-results').slideUp(150);
    }
  });
});


// --------------------


// Todo | Project Management

let listContainer = document.querySelector(".list_container");
let taskName = document.getElementById("task_name");
let taskLink = document.getElementById("link");
let taskDescription = document.getElementById("task_description");
let saveTaskBtn = document.getElementById("add_task_btn");
let addAnotherTask = document.getElementById("add_other_task");
let deleteTask = document.getElementById("delete_task");
let addTaskHeading = document.getElementById("add_task_heading");
let taskMessage = document.getElementById("task_message");
let taskCount = 0;

// Add Task | Project Management

saveTaskBtn.addEventListener("click", () => {
  if (taskName.value === "" || taskDescription.value === "") {
    alert("Task name and Description is required");
  } else {

    let li = document.createElement("li");
    let task = taskName.value;
    let link = taskLink.value;
    let description = taskDescription.value;

    li.innerHTML = `
      <div class="task_head">
        <h3>${task}</h3>
        <div class="task_delete">
            <img src="images/edit-task.svg" class="edit_img"  alt="Edit task">
            <img src="images/icon-delete.svg" class="delete_img" alt="Delete task">
        </div>
      </div>
      <div class="task_link">
        <a href="${link}" target="_blank"><img src="images/copy-link.svg" alt="Copy">${link}</a>
      </div>
      <div class="task_content">
        <p>${description}</p>
      </div>
    `;

    listContainer.appendChild(li);
    taskCount++;

    taskMessage.style.display = "inline"

    addTaskHeading.innerHTML = "Added Task";

    setTimeout(() => {
      taskMessage.style.display = "none"
    }, 3000);

    // Delete Task | Project Management

    let deleteTask = li.querySelector(".delete_img");

    deleteTask.addEventListener("click", () => {
      let answer = confirm("Are you sure you want to delete that task?");
      if (answer) {
        li.remove();
        taskCount--;
        if (taskCount === 0) {
          addTaskHeading.innerHTML = "No Tasks Added";
          listContainer.style.margin = "0px"
        }
      }
    });

    let editTask = li.querySelector(".edit_img");

    editTask.addEventListener("click", (e) => {
      taskName.value = task;
      taskLink.value = link;
      taskDescription.value = description;
      li.remove();
    });

  }

  taskName.value = "";
  taskLink.value = "";
  taskDescription.value = "";

  // Margin for List Container

  if (taskCount === 0) {
    listContainer.style.margin = "0px"
  } else {
    listContainer.style.margin = "24px 0 0"
  }

});

// Add another task | Project Management

addAnotherTask.addEventListener("click", () => {
  taskName.value = "";
  taskLink.value = "";
  taskDescription.value = "";
});


// Upload image file | Project Management

let imgResult = document.querySelector(".img_result");
let inputFile = document.getElementById("input_file");
let dropArea = document.getElementById("drop_area");
let imgView = document.getElementById("uploaded_img");
let imgName = document.getElementById("img_name");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  let file = inputFile.files[0];
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  imgView.style.backgroundImage = `url(${imgLink})`;
  imgName.innerHTML = file.name;
  imgResult.style.display = "flex"
}

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});