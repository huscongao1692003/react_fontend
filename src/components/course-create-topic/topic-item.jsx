import LessionItem from "./lesson-item";

function TopicItem({ data }) {
  // const { lessonId, url, name, typeFile, index, listAssignment } = data;

  const { topicTitle, lessons } = data;

  console.log(lessons);

  const LessonItemsHTML = lessons?.map((item, index) => (
    <LessionItem data={item} key={index} number={index} />
  ));

  return (
    <div
      className="card card-header-actions"
      style={{ width: "70%", margin: "2% auto" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <p className="mb-0 font-weight-bold">{topicTitle}</p>
        <div>
          <button type="button" className="btn btn-sm btn-outline-success m-1">
            Edit
          </button>
          <button type="button" className="btn btn-sm btn-outline-danger">
            Delete
          </button>
        </div>
      </div>
      <div className="card-body">{LessonItemsHTML}</div>
    </div>
  );
}

export default TopicItem;
