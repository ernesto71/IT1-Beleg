//Variablendeklaration notwendig

let p, v, m;

//starte erst nach vollständigem Laden der Seite
document.addEventListener('DOMContentLoaded', function(){
    m = new DemoModel();
    p = new DemoPresenter();
    v = new DemoView(p);
    p.setModelandView(m, v);
    setTimeout(p, start, 3000);
});

//modell
class DemoModel{
    getTask(){
        return "42";
    }
}

//Presenter
class DemoPresenter{
    setModelandView(m, v) {
        this.m = m;
        this.v = v;
    }

    start() {
        //Applikation beginnt hier
        let a = m.getTask();
        document.getElementById("idp").innerHTML = " ";
        let b = document.getElementById("task");
        b.innerHTML = "Aufgabe" + a;
    }

    //Eventhandling im Presenter
    evaluate(answer){
        console.log("Presenter -> Antwort:" +answer);
    }
    aufgabenWahl(nr){
        console.log("Presenter -> Aufgabenwahl:" +nr);
    }
}

//View
class DemoView{
    constructor(p){
        this.p = p;             //Presenter
        this.setHandler();      //setzt alle Handlerfunktionen
    }

    setHandler(){
        //Phasen: Capturing -> Target -> Bubbling
        //use capture false -> bubbling (von unten nach oben)
        //this soll bei Eventauslösung auf view objekt statt auf Event zeigen -> bind(this)
        document.getElementById("tasten").addEventListener("click", this.evaluate.bind(this), false);
        document.getElementById("tasten").addEventListener("mousedown", this.colorOn.bind(this));
        document.getElementById("tasten").addEventListener("mouseup", this.colorOff.bind(this));
        document.getElementById("aufgabenwahl").addEventListener("click", this.aufgabenWahl.bind(this), false);

        //Vorbelegung von Inhalten
        document.querySelectorAll("#tasten > *")[0].setAttribute("number",0);
        document.querySelectorAll("#tasten > *")[1].setAttribute("number",1);
        document.querySelectorAll("#tasten > *")[2].setAttribute("number",1);
    }

    aufgabenWahl(event){
        console.log("AufgabenWahl: " +event.target.type);
        this.p.aufgabenWahl(1);
    }

    evaluate(event){
        console.log("View -> Evaluate: " +event.type + " " + event.target.nodeName); //Debugging
        if(event.target.nodeName.toLowerCase() === "button"){
            this.p.evaluate(Number(event.target.attributes.getNamedItem("number").value));
        }
    }

    colorOn(event){
        //ignoriere andere als button event
        if(event.target.nodeName.toLowerCase() === "button"){
            this.color = event.target.style.backgroundColor;         //save color, leerer String bei Standardwert
            console.log("colorOn: " +event.type + "color " + this.color);   //debugging 
            if(event.target.attributes.getNamedItem("number").value === "0"){
                event.target.style.backgroundColor = "green";
            }else event.target.style.backgroundColor = "red";
        }
    }

    colorOff(event){
        console.log("ColorOff: " +event.type + "Color: " + this.color);
        event.target.style.backgroundColor = this.color;
    }
}

