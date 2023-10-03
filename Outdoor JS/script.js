// лого не вращается
const flipLogo = document.querySelector('.part1__flip');
flipLogo.addEventListener('click', function(e) {
    this.classList.toggle('_stop-rotation');
});

// бургер-меню
const menuIcon = document.querySelector('.part2__menu-icon');
const menuNav = document.querySelector('nav');
menuIcon.addEventListener('click', function() {
    document.body.classList.toggle('_lock');
    menuIcon.classList.toggle('_active');
	menuNav.classList.toggle('_active');
});
const menuLinks = document.querySelectorAll('[data-goto]');
menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", clickOnLink);
});
function clickOnLink(e) {
    const menuLink = e.target;
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
    if (menuIcon.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        menuIcon.classList.remove('_active');
        menuNav.classList.remove('_active');
    }
	window.scrollTo({
		top: gotoBlockValue
	});
}

// все ссылки неактивны
let allLinks = document.querySelectorAll('a');
for (anyLink of allLinks){
    anyLink.addEventListener("click", function(e){
        e.preventDefault();
    });
}

// спойлеры
const spButtons = document.querySelectorAll(".pages__title, .gear-categories__title, .company__title");
spButtons.forEach(pressedSpButton => {
    pressedSpButton.addEventListener("click", function() {
        this.classList.toggle("_open");
        let spContent = this.nextElementSibling;
        if (this.classList.contains("_open")){
            spContent.style.maxHeight = spContent.scrollHeight + "px";
        } else {
            spContent.style.maxHeight = "";
        }
        spButtons.forEach(anySpButton => {
            let spContent = anySpButton.nextElementSibling;
            if (anySpButton != this) {
                spContent.style.maxHeight = "";
                anySpButton.classList.remove("_open");
            }
        });
    });
});

// параллакс-эффект при движении мыши
let parallax = document.querySelector('.box1');
let parallaxImg = document.querySelector('.box1__bg');
parallax.addEventListener("mousemove", function(e) {
    const parallaxWidth = parallax.offsetWidth;
    const parallaxHeight = parallax.offsetHeight;
    const parallaxLeft = parallax.getBoundingClientRect().left;
    const parallaxTop = parallax.getBoundingClientRect().top;
    parallaxImg.style.cssText = `transform: translate3d(
                                ${(e.clientX - parallaxWidth / 2 - parallaxLeft) / 7}px,
                                ${(e.clientY - parallaxHeight / 2 - parallaxTop) / 7}px,
                                0);`;
});

// анимация элементов при скролле (70%)
var options = {
    threshold: 0.7
};
var callback = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('_transform');
        } else {
            entry.target.classList.remove('_transform');
        }
    });
    if (document.querySelector('.box1__content').classList.contains('_transform')) {
        observer.unobserve(document.querySelector('.box1__content'));
    }
};
var observer = new IntersectionObserver(callback, options);
var animItems = document.querySelectorAll('.anim-item');
animItems.forEach(animItem => {
    observer.observe(animItem);
});

// анимация элементов при скролле (30%)
var options2 = {
    threshold: 0.3
};
var callback2 = function(entries2) {
    entries2.forEach(entry2 => {
        if (entry2.isIntersecting) {
            entry2.target.classList.add('_transform');
        } else {
            entry2.target.classList.remove('_transform');
        }
    });
};
var observer2 = new IntersectionObserver(callback2, options2);
var animItems2 = document.querySelectorAll('.anim-item2');
animItems2.forEach(animItem2 => {
    observer2.observe(animItem2);
});

// параллакс-эффект при скролле
jarallax(document.querySelector('.jarallax'), {
    imgPosition: '',
    disableParallax: /Safari|Edg|Firefox/
});

// outline для input
document.body.addEventListener('mousedown', function() {
    document.body.classList.add('_using-mouse');
});
document.body.addEventListener('keydown', function(e) {
    if (e.key === "Tab") {
        document.body.classList.remove('_using-mouse');
    }
});