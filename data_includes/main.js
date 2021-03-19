PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment
// This is run at the beginning of each trial
Header(
    // Declare a global Var element "ID" in which we will store the participant's ID
    newVar("ID").global()
)

// First show instructions, then experiment trials, send results and show end screen
Sequence("ethics", "participants", "instructions", "exercise", "start_experiment", randomize("experiment"), "end")
//Sequence("start_experiment", "experiment", "end")

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
        newText("sentence", {s : row.SENTENCE})
            .center()
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
        newText("sentence", {s : row.SENTENCE})
            .center()
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
    )
    .log("list", row.LIST)
    .log("item", row.ITEM)
    .log("condition", row.CONDITION)
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