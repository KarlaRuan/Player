class Video{ 
	constructor(selector){
		this.selector=selector;
		this.playerElement=document.querySelector(selector);
		this.videoElement=document.querySelector(selector+ " video");

		this.bindEvents();
	}
	bindEvents(){
		this.playPauseBtn=document.querySelector(this.selector + " .play-pause");
		this.showVolumeBtn=document.querySelector(this.selector + " .show-volume");
		this.volumeRange=document.querySelector(this.selector + " #volume-range");
		this.progressBar=document.querySelector(this.selector + " .bar");

		this.playPauseBtn.addEventListener('click',()=>this.playPause());
		this.showVolumeBtn.addEventListener('click',()=>this.toggleVolume()); /*Crea funcion para aparecer y desaparecer icono*/
		this.volumeRange.addEventListener('input',()=>this.updateVolume());
		this.videoElement.addEventListener('timeupdate',()=>this.updateProgress());
		this.videoElement.addEventListener('durationchange',()=>this.setFullDuration());

	}
	playPause(){
		if(this.videoElement.paused){
				this.videoElement.play();
				this.playPauseBtn.innerHTML="pause";
			} else{
				this.videoElement.pause();
				this.playPauseBtn.innerHTML="play_arrow";
			}

	}
	toggleVolume(){
		document.querySelector(this.selector + " .volume").classList.toggle('active');	
	}
	updateVolume(){  //Función para cambiar de iconos dependiendo del volumen
		if(this.volumeRange.value==0){
			this.showVolumeBtn.innerHTML="volume_mute";
		}else if(this.volumeRange.value<.5){
			this.showVolumeBtn.innerHTML="volume_down";
		}else{
			this.showVolumeBtn.innerHTML="volume_up";
		}
		this.videoElement.volume=this.volumeRange.value;
	}
	setFullDuration(){
		this.setTime(this.videoElement.duration,".full-duration");
	}
	setTime(duration,selector){
		let minutes=parseInt(duration/60,10);
		let seconds=parseInt(duration % 60);

		if(minutes<10){
			minutes="0"+minutes;
		}
		if(seconds<10){
			seconds="0"+seconds;
		}
		document.querySelector(this.selector + " "+selector).innerHTML=minutes+":"+seconds;
	}

	updateProgress(){
		let currentTime=this.videoElement.currentTime; //Guardarmos lo que lleva el video
		let fullTime=this.videoElement.duration; //Guardarmos la duracion total del video

		this.setTime(currentTime,".current-duration");
		/*Regla de 3 para obtener cuanto se irá recorriendo la barra de progreso
		fullTime	 100
		currentTime  x    */
		let percentage= Math.floor((currentTime * 100) / fullTime); //Mah.floor es para redondear
		this.progressBar.style.width=percentage+"%"; //Actualizar el ancho de la barra de progreso
	}
}