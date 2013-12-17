function Reset(){
	$('.slotmachine-cash').html("1000");
	$('.slot').stop();
	$('.slot').css("background-position","0 0");
	won=true;
}

function ModPosY(slot){
	y=slot.css('background-position').split(' ')[1];
	y=parseInt(y.replace("px",""))%800;
	slot.css('background-position','0 '+y+'px');
}

function CheckWon(){
	cash=parseInt($('.slotmachine-cash').html());
	price=parseInt($('.slotmachine-cash').data('price'));
	if(cash>=price)
	{
		$('.slotmachine-spin').prop('disabled',$('.slot').is(':animated'));
	}
	else
	{
		$('.slotmachine-spin').prop('disabled',true);
	}
	
	if(!$('.slot').is(':animated') && !won)
	{
		pos1=$('#slot1').css('background-position').split(' ')[1];
		pos2=$('#slot2').css('background-position').split(' ')[1];
		pos3=$('#slot3').css('background-position').split(' ')[1];
		if(pos1==pos2 && pos2==pos3)
		{
			switch(parseInt(pos1.replace("px","")))
			{
				case    0: { cash+=250;   break; }
				case -100: { cash+=500;   break; }
				case -200: { cash+=750;   break; }
				case -300: { cash+=1000;  break; }
				case -400: { cash+=2500;  break; }
				case -500: { cash+=5000;  break; }
				case -600: { cash+=7500;  break; }
				case -700: { cash+=10000; break; }
			}
			$('.slotmachine-cash').html(cash);
			won=true;
		}
	}
}

function Spin(){
	won=false;
	if(cash>=price && !$('.slot').is(':animated'))
	{
		move1=100+Math.round(Math.random()*23)*100
		move2=100+Math.round(Math.random()*23)*100
		move3=100+Math.round(Math.random()*23)*100
		
		$('#slot1').animate({
			backgroundPositionY : "-="+move1
		},move1,0,function(){
			ModPosY($(this));
		});
		
		move=Math.round(Math.random()*24)*100
		$('#slot2').animate({
			backgroundPositionY : "-="+move2
		},move2,0,function(){
			ModPosY($(this));
		});
		
		move=Math.round(Math.random()*24)*100
		$('#slot3').animate({
			backgroundPositionY : "-="+move3
		},move3,0,function(){
			ModPosY($(this));
		});
		
		cash=parseInt($('.slotmachine-cash').html());
		cash-=price;
		$('.slotmachine-cash').html(cash);
	}
}

$(document).ready(function(){
	var i,move1,move2,move3,arr,cash,y,pos1,pos2,pos3,won;
	
	for(i=1;i<=3;i+=1)
	{
		$('.slotmachine').append('<div class="slot" id="slot'+i+'"></div>');
	}
	$('.slotmachine').append('<div class="shadow"></div>');
	
	won=false;
	setInterval(CheckWon,1);
});