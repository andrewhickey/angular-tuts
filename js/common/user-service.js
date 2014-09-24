.factory('userFactory', function() {
    var factory = {};
    var user = {
      fname: 'Andrew', 
      lname: 'Hickey', 
      email: 'andrew.hickey@ht2.co.uk',
      image: 'profile.jpg',
      company: 'HT2 ltd',
      about_me: 'I am dog',
      areas_of_interest: 'Bones, food.',
      education: 'Trained to sit on command and roll over when given treats',
      strengths_experiences: 'I am extremely strong in the running around department but weak in cognitive areas',
      personal_quest: {
        id: 1,
        body: 'I look to find all of the sticks.'
      },
      focus_areas: {
        id: 2,
        body: 'I am really focused on eating.'
      },
    };  

    factory.getUser = function(value) {
      return value ? {} : user;
    }
    return factory;
})