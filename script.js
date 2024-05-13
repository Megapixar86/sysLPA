	// получить елемент по ID
	const el = (id)=> document.getElementById(id)
	//выбираем элементы
	const es = (selector)=> document.querySelector(selector)
	//извлечь значение первого элемента по имени
	const enm = (name)=> document.getElementsByName(name)[0]
	//ограничить значение
	function LimNum(num, minNum, maxNum){
		if(num < minNum || isNaN(num) ){
			num = minNum
		}
		if(num > maxNum){
			num = maxNum
		}
		return num
	}
	//получить и отредактировать значение
	function GetSetData(str, minVal, maxVal){
		let Val = LimNum(+el(str).value, minVal, maxVal)
		el(str).value = Val
	}
	//подбор оборудования
	function selmodel(){
		//очищаем поле
		//if(el("grid") !== null){
		while(el("row") !== null){
			el("grid").removeChild(el("row"))
		}
		//база оборудования
		baza = {
			model:["LPA-MINI300", "LPA-LX240", "LPA-LX480", "LPA-LX650", "LPA-Presta-2", "LPA-DUO", "LPA-Presta-8", "LPA-Presta-16", "LPA-EVA"],
			name:[
				"Настенная система оповещения 300 Вт/100 В, 1 зона, 1 мик., 1 лин. вх., контроль линий, ГОЧС, отсек для аккумуляторов 17А*ч/2шт",
				"USB, Микшер-усилитель 240 Вт/100 В, Тюнер, 2 мик-х, 3 лин-х вх., селектор 5 зон, приоритеты, контроль линий",
				"USB, Микшер-усилитель 480 Вт/100 В, Тюнер, 2 мик-х, 3 лин-х вх., селектор 5 зон, приоритеты, контроль линий",
				"USB, Микшер-усилитель 650 Вт/100 В, Тюнер, 2 мик-х, 3 лин-х вх., селектор 5 зон, приоритеты, контроль линий",
				"Cистема оповещения, настенное крепление, 2 зоны, 240 Вт, с боксом для аккумуляторов 17А*ч/ 2шт.",
				"Cистема оповещения, расширение кратно 8 зон, в блоке встроенный усилитель 500 Вт",
				"Cистема оповещения, настенное крепление, 8 зоны, 650 Вт, с боксом для АКБ 26 А*ч/ 2шт.",
				"Cистема оповещения, настенное крепление, 16 зон, 1000 Вт, требуется бокс LPA-Presta-BOX",
				"Cистема оповещения, расширение кратно 8 зон, усилитель до 500 Вт на зону, есть расписание",
			],
			url:[
				["https://luis-lpa.ru/catalog/soue/lpa-mini300.html ", "https://support.luis.ru/home/LPA/lpaMINI "],
				["https://luis-lpa.ru/catalog/mixers/lpa-lx240.html ", "https://support.luis.ru/ru/home/LPA/lpaLX "],
				["https://luis-lpa.ru/catalog/monoblochnaya-sistema/lpa-lx480.html ", "https://support.luis.ru/ru/home/LPA/lpaLX "],
				["https://luis-lpa.ru/catalog/monoblochnaya-sistema/lpa-lx650.html ", "https://support.luis.ru/ru/home/LPA/lpaLX "],
				["https://luis-lpa.ru/catalog/rasshiryaemaya-sistema-lpa-presta/lpa-presta-2.html ", "https://support.luis.ru/home/LPA/lpaPRESTA "],
				["https://luis-lpa.ru/catalog/lpa-duo-system/info/ ", "https://support.luis.ru/home/LPA/lpaDUO "],
				["https://luis-lpa.ru/catalog/rasshiryaemaya-sistema-lpa-presta/lpa-presta-8.html ", "https://support.luis.ru/home/LPA/lpaPRESTA "],
				["https://luis-lpa.ru/catalog/rasshiryaemaya-sistema-lpa-presta/lpa-presta-16.html ", "https://support.luis.ru/home/LPA/lpaPRESTA "],
				["https://luis-lpa.ru/catalog/lpa-eva-system/info/ ", "https://support.luis.ru/ru/home/LPA/LPA-EVA"],
				
			],
			alarm:[true, true, true, true, true, true, true, true, true],
			music:[false, true, true, true, true, true, true, true, true],
			signal:[false, false, false, false, false, false, false, true],
			zone:[1, 1, 1, 1, 40, 160, 160, 320, 255],
			power:[250, 200, 400, 520, 4000, 8000, 10400, 16400, 102000],
			design:["wall", "stoika", "stoika", "stoika", "wall",  "stoika", "wall", "wall", "stoika"],
			count:[0, 5, 5, 5, 28, 28, 28, 28, 32],
			ip:[false, false, false, false, false, false, false, true]
		}
		
		//отбор значений
		//console.log(answer())
		const answ = answer()
		let number = []
		if(answ[7] === true || answ[2] === true){
			number.push(8)
		}else{
			let i =0
			if(answ[1] === true){
				i = 1
			}
			for(; i<=8; i++){
				//console.log(baza.zone[i])
				if(answ[3]<=baza.zone[i] && answ[4]<=baza.power[i] && answ[6]<=baza.count[i]){
						number.push(i)
				}
			}
		}
		let numberSort = []
		for(num of number){
			//console.log(num)
			if(answ[5] === baza.design[num]){
				numberSort.push(num)
			}
		}
		console.log(numberSort)
		//добавим эти значения в таблицу
		if(numberSort.length !== 0){
			for(num of numberSort){
				getTable(baza.url[num][0] ,baza.model[num], baza.name[num], baza.url[num][1])
			}
		}else{
			getEmpty()
		}
		//el("data").style.display = "block"
	}
	//функция сбора ответов
	function answer(){
		ar = []
		UpdateData()
		let des
		if(el('wall').checked){
			des = "wall"
		}else{
			des = "stoika"
		}
		ar.push(el('alarm').checked, el('music').checked, el('signal').checked, +el('zone').value, +el('power').value, des, +el('count').value, el('ipyes').checked)
		return ar
	}
	function UpdateData(){
		GetSetData('zone', 1, 320)
		GetSetData('power', 200, 102000)
		GetSetData('count', 0, 32)
	}
	// функция вставки данных на страницу
	function getTable(href_model, name, descript, href){
		/*if(el("grid") !== null){
			el("data").removeChild(el("grid"))
		}*/
		//let str = '<div id="grid"><div>Система</div><div>Описание</div><div>О системе</div>'
		//str = str + '<div><a href=' + href_model + '>' + name + '</a></div><div>' + descript + '</div><div><a href=' + href + '>support.luis.ru</a></div></div></br>'
		//let str = '<a href=' + href_model + '>' + name + '</a></div><div>' + descript + '</div><div><a href=' + href + '>support.luis.ru</a></div>'
		//es('#data').insertAdjacentHTML('beforeend', str)
		let str = '<div id = "row"><a href=' + href_model + '>' + name + '</a></div><div id = "row">' + descript + '</div><div id = "row"><a href=' + href + '>support.luis.ru</a></div>'
		es('#grid').insertAdjacentHTML('beforeend', str)
		el("data").style.display = "block"
		
	}
	function getEmpty(){
		//let str = '<div id="grid"><div>Система</div><div>Описание</div><div>О системе</div>'
		//str = str + '<div></div><div>нет подходящих систем</div><div></div></div>'
		let str = '<div id = "row"></div><div id = "row">нет подходящих систем</div><div id = "row"></div>'
		es('#grid').insertAdjacentHTML('beforeend', str)
		el("data").style.display = "block"
	}
	// основная функция
	function onLoadHandler() {
		//-- подключаем обработчик щелчка
		document.addEventListener("click", UpdateData)
		el("btn").addEventListener("click", selmodel);
		//el("btn2").addEventListener("click", print);
	}
	//пуск
	window.onload = onLoadHandler;