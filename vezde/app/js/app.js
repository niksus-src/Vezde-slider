import {Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper';
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

import {gsap, Power2} from 'gsap';

import MicroModal from 'micromodal';

document.addEventListener('DOMContentLoaded', () => {

	const swiperImg = new Swiper('.slider-img', {
		loop: false,
		speed: 2400,
		parallax:true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: (swiper, current, total) => (total < 10) ? `0${total}` : `${total}` 
		}
	})

	const swiperText = new Swiper('.slider-text', {
		loop: false,
		speed: 2400,
		mousewheel: {
			invert: true
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		scrollbar: {
			el: '.swiper-scrollbar'
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	})

	swiperImg.controller.control = swiperText
	swiperText.controller.control = swiperImg

	let gear = document.querySelector('.slider-gear')

	swiperText.on('slideNextTransitionStart', () => {
		gsap.to(gear, 2.8, {
			rotation: '+=35',
			ease: Power2.easeOut
		})
	})

	swiperText.on('slidePrevTransitionStart', () => {
		gsap.to(gear, 2.8, {
			rotation: '-=35',
			ease: Power2.easeOut
		})
	})

	//Slide Change

	let curnum = document.querySelector('.slider-pagination-count .current'),
		pagecur = document.querySelector('.slider-pagination-num')

	swiperText.on('slideChange', () => {
		let index = swiperText.realIndex + 1,
			indRes = index >= 10 ? index : `0${index}`;
		gsap.to(curnum, .2, {
			force3D: true,
			y: -10,
			ease: Power2.easeOut,
			opacity: 0,
			onComplete: () => {
				gsap.to(curnum, .1, {
					force3D: true,
					y: 10
				})
				curnum.innerHTML = indRes
				pagecur.innerHTML = indRes
			}
		})
		gsap.to(curnum, .2, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3
		})
	})

// MODAL

	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true
	})

// CURSOR

	const body = document.querySelector('body'),
		  cursor = document.getElementById('cursor'),
		  links = document.querySelectorAll('a')
	let mouseX = 0, mouseY = 0, posX = 0, posY = 0

	let mouseCoords = (e) => {
		mouseX = e.pageX
		mouseY = e.pageY
	}

	gsap.to({}, .01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 5
			posY += (mouseY - posY) / 5
			gsap.set(cursor, {
				css: {
					left: posX,
					top: posY
				}
			})
		}
	})

	links.forEach(element => {
		element.addEventListener('mouseover', () => {
			cursor.classList.add('active')
		})
		element.addEventListener('mouseout', () => {
			cursor.classList.remove('active')
		})
	})


	body.addEventListener('mousemove', e => {
		mouseCoords(e)
		cursor.classList.remove('hidden')
	})
	
	body.addEventListener('mouseout', () => {
		cursor.classList.add('hidden')
	})

})