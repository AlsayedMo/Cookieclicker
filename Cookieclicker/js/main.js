class Cookie {
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    //Dit wordt 1x uitgevoerd wanner "New" wordt gebruikt.
    constructor(newName, newHTMLElement, newScore) {
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () => {
        this.score.onCookieClicked(this.factor);
    }

    onStyleChange() {
        this.htmlElement.classList.add("cookie--chocolate");
    }

}

class Score {
    score;
    name = "";
    htmlElement = undefined;
    constructor(newScore, newName, newHTMLElement) {
        this.score = newScore;
        this.name = newName
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie) {
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;
    }

    subtractScore() {
        this.score = this.score - 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked() {
        setInterval(() => {
            this.score = this.score + 1000;
            this.htmlElement.innerText = this.score;
        }, 1000)
    }

    addPoints() {
        this.score = this.score + 10000;
        this.htmlElement.innerText = this.score;
    }
    scoreLoaded(newScore) {
        this.score = newScore
        this.htmlElement.innerText = this.score;
    }

}

class Multiplier {
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
        if (this.bought === false) {
            this.bought = true;
            this.cookie.score.subtractScore();
            this.cookie.factor = this.factor;
        }

    }
}


class Autoscore {
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement, score) {
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;
    }

    onAutoScoreClicked = () => {
        if (this.bought === false && window.localStorage.getItem("autoScore") !== "true") {
            this.bought = true;
            window.localStorage.setItem("autoScore", this.bought);
            this.score.substractScore();

        }
        this.score.onAutoScoreClicked();
    }
}

class ChocolateCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement,cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
    }

    onChocolateCookieClicked = () => {
        if(this.bought === true){
            this.bought = true;
            this.cookie.onStyleChange();
            this.cookie.score.addPoints();
        }
    }
}

//is het chocolatcookie gekocht in de localstorage?
        //zo ja dan moet ik chocolatecookie op false zettenj


class Save {
    htmlElement;


    constructor(newHTMLElement) {
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onSaveButtonClicked;

    }

    onSaveButtonClicked = () => {

        window.localStorage.setItem("score", score.score);
    }
}

class Load {
    score;


    constructor(score) {
        this.score = score;
        this.onLoad();
    }
    

    onLoad = function () {
        const scoreFromLocalStorag = parseInt(window.localStorage.getItem("score"));
        if(scoreFromLocalStorag !== Number) {
            this.score.scoreLoaded(parseInt(scoreFromLocalStorag));

        }

        
    }
}




class extraGif {
    htmlElement = undefined;
    bought = false;
    cookie = undefined;
    

    constructor(htmlElement, cookie) {
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.extraCookieClicked;
    }

    extraCookieClicked = () => {
        if (this.bought === true) {
            this.bought = true;
            this.cookie.onStyleChange();
            this.cookie.score.addPoints();
        }
    }
}








/*Setup For Score And Cookie*/
const score = new Score(100, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);

/*Setup Desktop Upgrades*/
const multiplier = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new Autoscore(document.getElementById("js--autoscore"), score);
const Chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);
const gif = new extraGif(document.getElementById("js--extraGif"), cookie);
const save = new Save(document.getElementById("js--save"), score);
const load = new Load(score);
/*setup mobile upgrades*/
const multiplierMobile = new Multiplier(document.getElementById("js--multiplier--mobile"), cookie)

window.localStorage.setItem("", "")