PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment
// This is run at the beginning of each trial
Header(
    // Declare a global Var element "ID" in which we will store the participant's ID
    newVar("ID").global(),
    newVar("GERMAN").global(),
    newVar("LAND").global(),
    newVar("NATIVE").global(),
    newVar("AGE").global(),
    newVar("GENDER").global(),
    newVar("HANDEDNESS").global()
)

// First show instructions, then experiment trials, send results and show end screen
Sequence("ethics", "participants", "instructions", "exercise", "start_experiment", randomize("experiment"), SendResults(), "end")

// Ethics agreement
newTrial("ethics",
    newHtml("ethics_explanation", "ethics.html")
        .print()
    ,
    newHtml("form", `<div class='fancy'><input name='consent' id='consent' type='checkbox'><label for='consent'>Ich bin mindestens 18 Jahre alt und erkläre mich damit einverstanden, an der Studie teilzunehmen. Ich habe die <em>Information für Probanden</em> gelesen und verstanden. Meine Teilnahme ist freiwillig. Ich weiß, dass ich die Möglichkeit habe, meine Teilnahme an dieser Studie jederzeit und ohne Angabe von Gründen abzubrechen, ohne dass mir daraus Nachteile entstehen. Ich erkläre, dass ich mir der im Rahmen der Studie erfolgten Auszeichnung von Studiendaten und ihrer Verwendung in pseudo- bzw. anonymisierter Form einverstanden bin.</label></div>`)
        .cssContainer({"width":"900px"})
        .print()
    ,
    newFunction( () => $("#consent").change( e=>{
        if (e.target.checked) getButton("Experiment starten").enable()._runPromises();
        else getButton("Experiment starten").disable()._runPromises();
    }) ).call()
    ,
    newButton("Experiment starten")
        .cssContainer({"margin-top":"1em"})
        .cssContainer({"margin-bottom":"1em"})
        .disable()
        .print()
        .wait()
)

// Participant information
newTrial("participants",
    defaultText
        .print()
    ,
    newText("<div class='fancy'><h2>Zur Auswertung der Ergebnisse benötigen wir folgende Informationen.<br>Sie werden streng anonym behandelt.</h2></div>")
    ,
    newText("participantID", "<b>Bitte tragen Sie Ihre Teilnehmer-ID ein. (bitte Eintrag durch Eingabetaste bestätigen)</b>")
    ,
    newTextInput("input_ID")
        .left()
        .log()
        .print()
        .wait()
    ,
    newText("<p><b>Ist Deutsch Ihre Muttersprache?</b></p>")
    ,
    newScale("input_german",   "ja", "nein")
        .radio()
        .cssContainer({"width":"900px"})
        .left()
        .labelsPosition("right")
        .log()
        .print()
        .wait()
    ,
    newText("<p><b>In welchem Bundesland wird Ihre Variante des Deutschen (bzw. Ihr Dialekt) hauptsächlich gesprochen?</b></p>")
    ,
    newDropDown("land", "(bitte auswählen)")
        .add("Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfal", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen", "nicht Deutschland, sondern Österreich", "nicht Deutschland, sondern Schweiz", "keines davon")
        .cssContainer({"width":"900px"})
        .left()
        .log()
        .print()
        .wait()
    ,
    newText("<p><b>Haben Sie andere Muttersprachen? (bitte Eintrag durch Eingabetaste bestätigen)</b></p>")
    ,
    newTextInput("input_native")
        .left()
        .log()
        .print()
        .wait()
    ,
    newText("<p><b>Alter in Jahren (bitte Eintrag durch Eingabetaste bestätigen)</b></p>")
    ,
    newTextInput("input_age")
        .left()
        .length(2)
        .log()
        .print()
        .wait()
    ,
    newText("<p><b>Geschlecht</b></p>")
    ,
    newScale("input_gender",   "weiblich", "männlich", "divers")
        .radio()
        .cssContainer({"width":"900px"})
        .left()
        .labelsPosition("right")
        .log()
        .print()
        .wait()
    ,
    newText("<p><b>Händigkeit</b></p>")
    ,
    newScale("input_hand",   "rechts", "links", "beide")
        .radio()
        .cssContainer({"width":"900px"})
        .left()
        .labelsPosition("right")
        .log()
        .print()
        .wait()
    ,
    newButton("weiter", "Weiter zur Instruktion")
        .cssContainer({"padding-top":"1em"})
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set(getTextInput("input_ID"))
        ,
    newVar("GERMAN")
        .global()
        .set(getTextInput("input_ID"))
        ,
    newVar("LAND")
        .global()
        .set(getTextInput("input_"))
        ,
    newVar("NATIVE")
        .global()
        .set(getTextInput("input_native"))
        ,
    newVar("AGE")
        .global()
        .set(getTextInput("input_age"))
        ,
    newVar("GENDER")
        .global()
        .set(getTextInput("input_gender"))
        ,
    newVar("HANDEDNESS")
        .global()
        .set(getScaleInput("input_hand"))
)

// Instructions
newTrial("instructions",
    newText("instructions_greeting", "<h2>Willkommen zum Experiment!</h2><p>Ihre Aufgabe in dieser Studie ist es, Sätze zu lesen und sie nach ihrer Natürlichkeit zu bewerten. Die Sätze sind unabhängig voneinander. Verlassen Sie sich bei der Bewertung der Natürlichkeit einfach auf Ihre Intuition. Zur Bewertung der Sätze nutzen Sie die folgende Skala:</p>")
        .cssContainer({"width":"900px"})
        .left()
        .print()
        ,
    newScale(7)
        .before( newText("left", "(<em>klingt sehr unnatürlich</em>)") )
        .after( newText("right", "(<em>klingt sehr natürlich</em>)") )
        .labelsPosition("top")
        .keys()
        .center()
        .print()
        .log()
        ,
    newHtml("instructions_text", "instructions.html")
        .print()
        ,
    newButton("go_to_exercise", "Übung starten")
        .cssContainer({"margin-top":"1em"})
        .print()
        .wait()
)

// Exercise
Template("exercise.csv", row =>
    newTrial( "exercise" ,
        newText("sentence", row.SENTENCE)
            .cssContainer({"margin-bottom":"2em"})
            .color("LightCoral")
            .center()
            .print()
            ,
        newScale(7)
            .before( newText("left", "(<em>klingt sehr unnatürlich</em>)") )
            .after( newText("right", "(<em>klingt sehr natürlich</em>)") )
            .labelsPosition("top")
            .keys()
            .center()
            .log()
            .print()
            .wait()
        ,
        newTimer("wait", 200)
            .start()
            .wait()
    )
)

// Start experiment
newTrial( "start_experiment" ,
    newText("<h2>Jetzt beginnt der Hauptteil der Studie.</h2>")
        .print()
    ,
    newButton("go_to_experiment", "Experiment starten")
        .print()
        .wait()
)

// Experimental trial
Template("experiment.csv", row =>
    newTrial( "experiment",
        newText("sentence", row.SENTENCE)
            .cssContainer({"margin-bottom":"2em"})
            .color("LightCoral")
            .center()
            .print()
            ,
        newScale(7)
            .before( newText("left", "(<em>klingt sehr unnatürlich</em>)") )
            .after( newText("right", "(<em>klingt sehr natürlich</em>)") )
            .labelsPosition("top")
            .keys()
            .center()
            .log()
            .print()
            .wait()
        ,
        newTimer("wait", 200)
            .start()
            .wait()
    )
    .log("LIST", row.LIST)
    .log("ITEM", row.ITEM)
    .log("CONDITION", row.CONDITION)
    .log("ADJECTIVE", row.ADJECTIVE)
    .log("ADVERB", row.ADVERB)
)

// Final screen
newTrial("end",
    newHtml("explain", "end.html")
        .cssContainer({"width":"900px"})
        .print()
    ,
    // Trick: stay on this trial forever (until tab is closed)
    newButton().wait()
)
.setOption("countsForProgressBar",false);