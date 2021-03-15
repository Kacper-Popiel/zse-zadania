// let url = 'http://edu.gplweb.pl/res/web-app-ajax/test.txt';
//let url = 'http://localhost/test.txt';
let url = 'http://localhost/firma.json';
let data = null

let getBundle = ()=>{
	console.log('Hello kitty');
	// stworzenie obiektu do komunikacji
	const xhr = new XMLHttpRequest();
	// ustawienie formatu danych odpowiedzi
	xhr.responseType = 'json'; // domyślnie Text
	// formaty: {text,arraybufer,blob,document,json}
	
	// skonfigurowanie połączenia
	xhr.open('GET'
		url,
		async = true
			);
	xhr.send(); // "wysłanie" połączenia
	// GET - pobieranie: data = null 
	// POST - wysyłanie: data = document.form[]
	console.log(xhr.response)	

	// ..wymagany nasłuch zdarzenia (zmiana statusu połączenia)
	xhr.addEventListener( 'readystatechange', (e)=>{
	if(xhr.readyState !==4){
		// komunikaty użytkownika
		console.log(xhr.readyState);
	}
	if(xhr.readyState ===4){
		if(xhr.status === 200){
			console.log('są kalesonki są');
			console.log(xhr);
		}
		if(xhr.status === 404)
			console.log('brak zasobu / błędny URL');
		if(xhr.status === 500){
			// możliwa większa awaria - odpuść dzisiaj
			console.log('Serwer odpadł');	
		}	
		if(xhr.status === 503){
			// spróbuj za kilka chwil
			console.log('Retry in... 3,2,1...');
		}		
	}, false);
	
	// nasłuchujemy obiektu XHR kiedy odbierze dokument: load
	xhr.addEventListener( 'load', (e)=>{
		console.log(xhr.response); //dane są...
		data = xhr.response; 
		if(data!==null){
			let i = 1;
			let timeInt = 1000; // ms (1s)
			let t1 = setInterval( function(){
					if(i===data.length-1)
						clearInterval(t1);
					insItem(i++, data[i-1]);
			} , timeInt);
		//	data.forEach( item => insItem(i++,item) );
		// setStatusBar(); ZROBIĆ!!!!! uaktualnienie danych na pasku idk
		}
		}, false);
	}
		
let insItem = (i, item)=>{
	let main = document.querySelector('#main');
	let tpl = document.querySelector('#rowTplt');
	let r2 = tpl.content.cloneNode(true);
	let rid = r2.quertSelector('#row-'); // DIV id="row-"
		rid.id = rid.id+i; // <div id="row-1" ... -2 -3 >
	let cells = r2.quertSelector('p');
		cells[0].textContent = i;
		cells[1].textContent = item.imie;
		cells[2].textContent = item.nazwisko;
		cells[3].textContent = item.stanowisko;
	main.appendChild(r2);
	// addNavItem(i); ZROBIĆ!!!!! dodanie przycisku na dole
}	

}
window.addEventListener('load', getBundle, false);