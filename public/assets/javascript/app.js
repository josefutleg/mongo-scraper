var questions = [
    'Your mind is always buzzing with unexplored ideas and plans.',
    'Generally speaking, you rely more on your experience than your imagination.',
    'You find it easy to stay relaxed and focused even when there is some pressure.',
    'You rarely do something just out of sheer curiosity.',
    'People can rarely upset you.',
    'It is often difficult for you to relate to other people’s feelings.',
    'In a discussion, truth should be more important than people’s sensitivities.',
    'You rarely get carried away by fantasies and ideas.',
    'You think that everyone’s views should be respected regardless of whether they are supported by facts or not.',
    'You feel more energetic after spending time with a group of people.',
]

function showSurvery(){
    var inputName = $('<input>').attr('type', 'text').attr('id', 'name').attr('placeholder', 'your name here');
    var inputLink = $('<input>').attr('type', 'text').attr('id', 'link').attr('placeholder', 'your link here');
    var nameHead = $('<h4>').text('Your Name (Required)');
    var linkHead = $('<h4>').text('Your Photo Link (Required)');
    
    $('.user').append(nameHead);
    $('.user').append(inputName);
    $('.user').append(inputLink);
    $('.user').append(linkHead);

    
}
showSurvery();