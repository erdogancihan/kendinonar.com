const initState = {
  messages: [
    {
      id: "1",
      main: "ARABALAR",
      sub: "BENZİNLİ ARABALAR",
      messageTitle: "Opel Enjectör Arızası",
      messageContent: "araba bozuldu",
      uId: "user1"
    },
    {
      id: "2",
      main: "ARABALAR",
      sub: "BENZİNLİ ARABALAR",
      messageTitle: "Toyota Enjectör Arızası",
      messageContent: "araba bozuldu",
      uId: "user1"
    },
    {
      id: "3",
      main: "Arabalar",
      sub: "dizel",
      messageTitle: "Honda",
      messageContent: "araba bozuldu",
      uId: "user1"
    },
    {
      id: "4",
      main: "Cep Telefonları",
      sub: "Android",
      messageTitle: "samsung",
      messageContent: "telefon açılmıyor",
      uId: "user1"
    },
    {
      id: "5",
      main: "Cep Telefonları",
      sub: "IOS",
      messageTitle: "IPhone",
      messageContent: "telefon açılmıyor bozuldu",
      uId: "user1"
    },
    {
      id: "6",
      main: "Bisikletler",
      sub: "Dağ",
      description: "Dağ Bisikletleri hakkında genel bilgiler.",
      topicCount: 56,
      messageCount: 3258
    },
    {
      id: "7",
      main: "Cep Telefonları",
      sub: "Android",
      messageTitle: "LG",
      messageContent: "telefon açılmıyor",
      uId: "user1"
    }
  ]
};
const forumReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_MAINTOPIC":
      console.log("maintopic added", action.mainTopic);

      return state;
    case "ADD_MAINTOPIC_ERR":
      console.log("add maintopic err", action.err);
      return state;
    case "ADD_SUBTOPIC":
      console.log("subtopic added", action.subTopic);
      return state;
    case "ADD_SUBTOPIC_ERR":
      console.log("add maintopic err", action.err);
      return state;
    case "EDIT_SUBTOPIC":
      console.log("subtopic edited", action.message);
      return state;
    case "EDIT_SUBTOPIC_ERR":
      console.log("EDIT subtopic err", action.err);
      return state;
    case "EDIT_TOPICCOUNT":
      console.log("topiccount edited", action.topicCount);
      return state;
    case "EDIT_TOPICCOUNT_ERR":
      console.log("EDIT subtopic err", action.err);
      return state;
    case "ADD_MESSAGE":
      console.log("message added", action.message);
      return state;
    case "ADD_MESSAGE_ERR":
      console.log("message add error", action.err);
      return state;
    case "EDIT_MESSAGE":
      console.log("message edited", action.message);
      return state;
    case "EDIT_MESSAGE_ERR":
      console.log("message edit error", action.err);
      return state;
    case "ADD_TOPIC":
      console.log("topic added", action.message);
      return state;
    case "ADD_TOPIC_ERR":
      console.log("add topic err", action.err);
      return state;
    case "EDIT_TOPIC":
      console.log("topic edited", action.message);
      return state;
    case "EDIT_TOPIC_ERR":
      console.log("edit topic err", action.err);
      return state;
    case "DELETE_MAINTOPIC":
      console.log("maintopic DELETED", action.mainTopic);
      return state;
    case "DELETE_MAINTOPIC_ERR":
      console.log("maintopic error", action.mainTopic);
      return state;
    case "DELETE_SUBTOPIC":
      console.log("subtopic DELETED", action.subTopic);
      return state;
    case "DELETE_SUBTOPIC_ERR":
      console.log("subtopic error", action.subTopic);
      return state;
    default:
      return state;
  }
};

export default forumReducer;
