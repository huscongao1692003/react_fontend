import LessionItem from "./lesson-item";

function TopicItem({ data }) {
  const { topicTitle, lessons } = data;


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
      <div className="card-body">{lessons.map((lesson, index) => (
          <LessionItem key={lesson.lessonId} data={lesson} />
        ))}</div>
    </div>
  );
}

export default TopicItem;
