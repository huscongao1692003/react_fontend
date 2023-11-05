function LessionItem({ data, number, isLastItem }) {
  const { assignmentId, name, topic, index, compulsory } = data;
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="icon"></div>
          <div className="ms-4">
            <div className="text-xs text-muted" style={{ fontWeight: "600" }}>
              Lesson{` ${name}`}
            </div>
            <div className="text-xs text-muted">{topic}</div>
          </div>
        </div>
        <div className="ms-4 small">
          <a href="javascript:void(0);" className="me-3">
            Edit
          </a>
          <a href="javascript:void(0);">Delete</a>
        </div>
      </div>
      {!isLastItem && <hr />}
    </>
  );
}

export default LessionItem;
