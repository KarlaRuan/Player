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

		this.playPauseBtn.addEventListener('click',()=>this.playPause());
		this.showVolumeBtn.addEventListener('click',()=>this.toggleVolume()); /*Crea funcion para aparecer y desaparecer icono*/
		this.volumeRange.addEventListener('input',()=>this.updateVolume());
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
	updateVolume(){
		if(this.volumeRange.value==0){
			this.showVolumeBtn.innerHTML="volume_mute";
		}else if(this.volumeRange.value<.5){
			this.showVolumeBtn.innerHTML="volume_down";
		}else{
			this.showVolumeBtn.innerHTML="volume_up";
		}
		this.videoElement.volume=this.volumeRange.value;
	}
}