const comments = [
  {
    _id: "67rdca3eeb7f6fg",
    userId: "67rdca3eeb7f6fgeed471815",
    pageId: "67rdca3eeb7f6fgeed471815",
    content: "Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки соответствующий условий активизации.",
    created_at: "1633576399367"
  },
  {
    _id: "67rdca3eeb7f6fgdasd",
    pageId: "67rdca3eeb7f6fgeed471815",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Значимость этих проблем настолько очевидна, что консультация с широким активом позволяет оценить значение систем массового участия.",
    created_at: "1633573058520"
  },
  {
    _id: "67rdca3eeb7f6fgdasbc",
    pageId: "67rdca3eeb7f6fgeed471815",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Не следует, однако забывать, что консультация с широким активом представляет собой интересный эксперимент проверки направлений прогрессивного развития.",
    created_at: "1634394550649"
  },
  {
    _id: "67rdca3eeb7f6fgdaasd",
    pageId: "67rdca3eeb7f6fgeed471817",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют определения и уточнения существенных финансовых и административных условий.",
    created_at: "1633573058520"
  }
];
if (!localStorage.getItem("comments")) {
  localStorage.setItem("comments", JSON.stringify(comments));
}
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(comments);
    }, 200);
  });

const fetchCommentsForUser = (userId) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("comments")).filter(
          (c) => c.pageId === userId
        )
      );
    }, 200);
  });
const add = (data) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const comments = JSON.parse(localStorage.getItem("comments"));
      const newComment = {
        _id: Math.random().toString(36).substr(2, 9),
        created_at: Date.now(),
        ...data
      };
      comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(comments));
      resolve(newComment);
    }, 200);
  });

const remove = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const comments = JSON.parse(localStorage.getItem("comments"));
      const newComments = comments.filter((x) => x._id !== id);
      localStorage.setItem("comments", JSON.stringify(newComments));
      resolve(id);
    }, 200);
  });
export default {
  fetchAll,
  fetchCommentsForUser,
  add,
  remove
};
