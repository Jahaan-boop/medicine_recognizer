name="";
acc="";

Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90
    });
    camera=document.getElementById("camera");
    Webcam.attach("#camera");
    
    function snapshot(){
    Webcam.snap(function(data_url){
    document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_url+'">';
    })
    }
    console.log("ML5 version:",ml5.version);
    //Enter your Teachable Machine Link below in this format: YOUR-LINK/model.json     If you need more detailed instructions, please check the Github repository.
    classifier=ml5.imageClassifier("link/model.json",modelloaded);
    function modelloaded(){
    console.log("Model Loaded")
    }
    
    function identify(){
    img = document.getElementById("capture_img");
    classifier.classify(img, gotResult);
    saynameandacc()
    }
    
    function gotResult(error,results){
    if(error){
    console.error(error);
    }
    else{
    console.log(results);
    document.getElementById("objname").innerHTML = results[0].label;
    document.getElementById("objacc").innerHTML = results[0].confidence.toFixed(3);
    name=results[0].label;
    acc=results[0].confidence.toFixed(3);
    }
    }

function readaloud(){
    let msg = "Medicine Recognizer. Train, or get your caretaker to train all your required medicines in Teachable Machine, to then link that model into this app and be able to recognize everyday medicines."
                
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";
    
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
}

function saynameandacc(){
var synth = window.speechSynthesis;
speak_data1 = "Medicine Name:"+name;
speak_data2 = "Accuracy:"+acc;
var utterthis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterthis);
}