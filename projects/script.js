$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});


// Visibility Change (tab switch effect)
const favicon = $("#favicon");

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Jigar Sable";
        favicon.attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        favicon.attr("href", "/assets/images/favhand.png");
    }
});


// Fetch Projects
function getProjects() {
    return fetch("projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load projects.json");
            }
            return response.json();
        });
}


// Render Projects
function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="${project.image}" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${project.links.code}" class="btn" target="_blank">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;


    // Initialize Isotope safely
    var $container = $('.box-container');

    if ($container.data('isotope')) {
        $container.isotope('destroy');
    }

    var $grid = $container.isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });


    // Filter Buttons
    $('.button-group').off('click').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');

        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}


// Load Projects
getProjects()
    .then(data => showProjects(data))
    .catch(error => console.error(error));


// Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

(function () {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];

    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    s0.parentNode.insertBefore(s1, s0);
})();


// Disable Developer Shortcuts
document.onkeydown = function (e) {

    if (e.key === "F12") return false;

    if (e.ctrlKey && e.shiftKey && e.key === "I") return false;

    if (e.ctrlKey && e.shiftKey && e.key === "C") return false;

    if (e.ctrlKey && e.shiftKey && e.key === "J") return false;

    if (e.ctrlKey && e.key === "U") return false;
};

