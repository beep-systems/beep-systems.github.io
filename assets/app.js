var currentLine = "";
var typeSpeed = 30;
var pauseLength = 1000;

var cursor = $("#cursor");
var animate = $(".animate");
var input = $("#inputcmd");
var output = $("#output");

input.keypress(keypressInput);
$("#terminal-window").click(openKeyboard);

animate.each(function (index) {
    $(this).addClass("hide");
});

var temp = setTimeout(printCharaters, typeSpeed);

function printCharaters() {
    // check if current line array is empty
    if (currentLine.length == 0) {
        // stop cursor from blinking
        cursor.removeClass("blink");

        // get first line of text and add it to an array
        currentLine = animate.first().text().split("");
        currentLine = currentLine.reverse();

        // remove text from dom and unhide element
        animate.first().html("");
        animate.first().removeClass("hide");
        cursor.appendTo(animate.first());
    }

    // animate typing
    animate.first().append(currentLine.pop()).append(cursor);

    // check if we just popped the last element of the array off
    if (currentLine.length == 0) {
        // remove animated DOM Element from animation
        animate.first().removeClass("animate");
        // get new list of DOM Elements to animate
        animate = $(".animate");
        // make cursor blink at the end-of-line.
        cursor.addClass("blink");

        // Animate next DOM Element if any remain
        if (animate.length > 0) {
            setTimeout(printCharaters, pauseLength);
        } else {
            // all text in the DOM Elements have been animated
            input.after(cursor);
            input.focus();
        }
    } else {
        // Animate next character in DOM Element
        setTimeout(printCharaters, typeSpeed);
    }
}

function keypressInput(e) {
    // received enter key, send cmd and clear input
    if (e.keyCode == 13) {
        var command = input.text();
		if (command.length > 0)
		{
			proccessCMD(command);
		}
        input.html("");
        e.preventDefault();
    }
}

function proccessCMD(cmd) {
    output.html("Link with the main server is lost");
}

function openKeyboard() {
    input.focus();
}