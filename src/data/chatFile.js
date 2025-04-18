const chatArray = [
  'Query for new Project',
  'Related Services',
  'Facing truble to useing Software',
  'Talk to Customer Support',
];
let relatedChat = {
  'Query for new Project': {
    'you know your PRoject Type': {
      'Single Page WebSite': {
        'webSite Useing REact and 3rd party css': {
          "Tailwind": {},
          "BoootStrap": {},
          "You Suggest": {},
        },
        'WebSite using 3d Animation': {
          'using SLiders': {
            'Top to Bottom': {},
            'Side to Middle': {},
          },
          'Using 3d Models': {
            'Selef Created 3D Models': {
              'Block Changing Design': {},
              'A Design Which can rotate': {},
            },
          },
          '3rd Party created Models': {
            'In diffrent formates': {},
            'In Known Formates': {},
          },
        },
      },
    },
    'Need Consletation about your Project': {
      'what is your Project About to': {
        'School Project': {},
        'Collage Project': {
          'your Project Needs Backend': {},
          'Your Project haveing Only Frontend': {},
          'You Need To Conselt About it': {
            'Contect Me on Mail': { 'apurve@gmail.com': {} },
            'Continue Chat for talk to conseltent': {},
          },
        },
      },
    },
  },
  'Related Services': {},
  'Facing truble to useing Software': {},
  'Talk to Customer Support': { 'Technical Support': {} },
};
let tempRelatedChat = relatedChat

function addData(value, selectedList) {
  let tempChat = relatedChat;
  if (selectedList.length == 1) {
    relatedChat[value] = {};
  } else {
    for (let i = 0; i < selectedList.length - 1; i++) {
      let key = selectedList[i]["selectedKey"];
      tempChat = tempChat[key]
    }
  }
  tempChat[value] = {};
  relatedChat = tempChat;
  return relatedChat;

}

export { chatArray, relatedChat, addData};