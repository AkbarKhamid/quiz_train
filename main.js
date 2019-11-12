(function() {
	const myQuestions = [
		{
			question: 'The country joined EU right after Greece?',
			answer: 'Spain/Portugal'
		},
		{
			question: 'For how long the 110 billion euro loan was given?',
			answer: 'three years'
		},
		{
			question: 'What were the Austerity measures',
			answer: 'Cut public spendings, salaries, jobs, pensions and increased taxes'
		},
		{
			question: 'What would happen if Greece just left eurozone?',
			answer: 'Debt owners would suffer because of the devaluation of drachma and Euro would weaken'
		},
		{
			question: 'What was the amount of the given additional support?',
			answer: '109 billion euro'
		},
		{
			question: 'How many percent of Greeks population lived in poverty in 2014?',
			answer: '44%'
		},
		{
			question: 'What were the problems other than financial crisis Greece has been dealing with? ',
			answer: 'Political crisis, riots, brain drain'
		},
		{
			question: 'What is the opposite affect of austerity measures financialy?',
			answer: 'It lowers the GDP'
		},
		{
			question: 'What triggered the Indignant Citizens Movement?',
			answer: 'Unfair austerity measures'
		},
		{
			question: 'What was the cause of economic declining of Greece after the Golden Age?',
			answer: 'Oil crisi'
		}
	];
	const groupPoints = [ 0, 0, 0, 0, 0, 0, 0, 0 ];

	const previousBtn = document.getElementById('previous');
	const nextBtn = document.getElementById('next');
	const showBtn = document.getElementById('showAnswer');
	const question = document.getElementById('question');
	const answer = document.getElementById('answer');
	const count = document.getElementById('count');
	const addBtns = document.getElementsByClassName('add-point');
	const takeBtns = document.getElementsByClassName('take-point');
	const confetti = document.getElementById('confetti');
	const MAX_POINTS = 10;
	nextBtn.addEventListener('click', showNextQuestion);
	previousBtn.addEventListener('click', showPreviousQuestion);
	showBtn.addEventListener('click', showAnswer);
	let index = 0;

	function init() {
		previousBtn.style.display = 'none';
		confetti.style.display = 'none';
		showQuestion();
		addEventListeners();
	}

	function showQuestion() {
		question.textContent = myQuestions[index].question;
		answer.textContent = myQuestions[index].answer;
		count.textContent = `${index + 1} ouf of ${myQuestions.length}`;
		answer.style.display = 'none';
	}
	function showAnswer() {
		answer.style.display = 'block';
	}

	function showNextQuestion() {
		if (index !== myQuestions.length - 1) {
			previousBtn.style.display = 'inline-block';
			index++;
			showQuestion();
		} else {
			question.innerHTML = "<h1>That's it! Thank you!</h1>";
			answer.style.display = 'none';
			showBtn.style.display = 'none';
			nextBtn.style.display = 'none';
		}
	}

	function showPreviousQuestion() {
		if (index !== 0) {
			nextBtn.style.display = 'inline-block';
			showBtn.style.display = 'inline-block';
			index--;
			showQuestion();
		} else {
			previousBtn.style.display = 'none';
		}
	}

	function addEventListeners() {
		for (let i = 0; i < addBtns.length; i++) {
			addBtns[i].addEventListener('click', addPoint);
			takeBtns[i].addEventListener('click', takePoint);
		}
	}

	function addPoint(e) {
		// get sibling of the btn
		const poinsTag = e.target.previousElementSibling;
		// get index val from last char of the class of the sibling
		let i = parseInt(poinsTag.className.slice(-1));
		i -= 1;
		// increment value in the array if less than max
		if (groupPoints[i] < MAX_POINTS) {
			groupPoints[i]++;
			moveBar(poinsTag, groupPoints[i]);
			// change textcontent of the points tag
			poinsTag.textContent = groupPoints[i];
		} else {
			// clear the screen
			document.querySelector('.bar-graph').style.display = 'none';
			// print the name of the winner
			document.getElementById('winner').textContent = `Congrats Group ${i + 1}`;
			// show the canvas
			confetti.style.display = 'block';
			// start confetting
			loop();
		}
	}

	function takePoint(e) {
		const poinsTag = e.target.nextElementSibling;
		// get index val from last char of the class of the sibling
		let i = parseInt(poinsTag.className.slice(-1));
		// decrement value in the array
		if (groupPoints[i] > 0) groupPoints[i]--;
		moveBar(poinsTag, groupPoints[i]);
		// change textcontent of the points tag
		poinsTag.textContent = groupPoints[i];
	}

	function moveBar(tag, num) {
		// get the parent element
		const progressBar = tag.parentNode.nextElementSibling.firstChild;
		// increase the width
		progressBar.style.width = `${num * 10}%`;
	}

	//=============================================CONFETTI =========================================
	const canvasEl = document.querySelector('#canvas');

	const w = (canvasEl.width = window.innerWidth);
	const h = (canvasEl.height = window.innerHeight - 395);

	function loop() {
		requestAnimationFrame(loop);
		ctx.clearRect(0, 0, w, h);

		confs.forEach((conf) => {
			conf.update();
			conf.draw();
		});
	}

	function Confetti() {
		//construct confetti
		const colours = [ '#fde132', '#009bde', '#ff6b00' ];

		this.x = Math.round(Math.random() * w);
		this.y = Math.round(Math.random() * h) - h / 2;
		this.rotation = Math.random() * 360;

		const size = Math.random() * (w / 60);
		this.size = size < 15 ? 15 : size;

		this.color = colours[Math.floor(colours.length * Math.random())];

		this.speed = this.size / 7;

		this.opacity = Math.random();

		this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
	}

	Confetti.prototype.border = function() {
		if (this.y >= h) {
			this.y = h;
		}
	};

	Confetti.prototype.update = function() {
		this.y += this.speed;

		if (this.y <= h) {
			this.x += this.shiftDirection / 3;
			this.rotation += this.shiftDirection * this.speed / 100;
		}

		if (this.y > h) this.border();
	};

	Confetti.prototype.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation + Math.PI / 2);
		ctx.lineTo(this.x, this.y);
		ctx.closePath();
		ctx.globalAlpha = this.opacity;
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	const ctx = canvasEl.getContext('2d');
	const confNum = Math.floor(w / 4);
	const confs = new Array(confNum).fill().map((_) => new Confetti());

	init(index);
})();
