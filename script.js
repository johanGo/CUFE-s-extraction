const inputArchivo = document.querySelector('#archivoXML');
let nameProvider = document.querySelector('#nameProvider');
let cufeProvider = document.querySelector('#cufeProvider');
let copyBtn = document.querySelector('#copy-btn');


inputArchivo.addEventListener('change', (evento) => {
	const archivo = evento.target.files[0];
	const lector = new FileReader();
	lector.readAsText(archivo);
			
	lector.onload = (eventoLector) => {
		const contenidoXML = eventoLector.target.result;

		//1 Expresión regular para extraer el CUFE
		const tagCUFE = 'cbc:UUID';
		const regexCUFE = new RegExp(`<${tagCUFE}\\b[^>]*>(.*?)<\\/\\s*${tagCUFE}\\s*>`, 's');	

		//2 Expresion regular para extraer el nombre del proveedor
		const tagName= 'cbc:RegistrationName';
		const regexName=new RegExp(`<${tagName}\\b[^>]*>(.*?)<\\/\\s*${tagName}\\s*>`, 's');
				
		//1 Buscar el CUFE en el contenido del archivo XML
		const resultadoCUFE = regexCUFE.exec(contenidoXML);

		//2 Buscar el Nombre del proveedor en el contenido XML
		const resultadoName= regexName.exec(contenidoXML);
				
		if (resultadoCUFE !== null && resultadoName!== null) {
			// console.log(`EL CUFE ES: ${resultadoCUFE[1]}`);
			// console.log(`El nombre del proovedor es: ${resultadoName[1]}`)
			nameProvider.innerHTML=resultadoName[1];
			cufeProvider.innerHTML=resultadoCUFE[1];
		} else {
			// console.log(`No se encontró el valor dentro del elemento ${tagCUFE}`);
			// console.log(`No se encontró el valor dentro del elemento ${tagName}`);
		}				
		
		copyBtn.addEventListener('click', (event)=>{
			event.preventDefault();
			navigator.clipboard.writeText(resultadoCUFE[1])
				
				.then(()=>{
					Swal.fire({
						icon:'success',
						title:'Texto Copiado',
						text:'',		
						showConfirmButton: false,				
						timer:1500,
						timerProgressBar: true
					})										
				})

				.catch(err =>{
					Swal.fire({
						icon:'error',
						title:'Opss...',
						text:'Algo salio mal',		
						showConfirmButton: false,				
						timer:2000
					})		
					console.error('Error al copiar texto: ', err);
				});												
		});			
	};		
});

copyBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	if(nameProvider.textContent === ''){
		Swal.fire({
			icon:'warning',
			title:'Opss...',
			text:'Esta vacio el campo',		
			showConfirmButton: false,				
			timer:1500
		})
	};
});

setInterval(function(){
	location.reload()
},5000)

