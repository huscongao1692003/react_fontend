function LessionItem({ data, number, isLastItem }) {
  // const { assignmentId, assignmentTitle, topic, index, compulsory } = data;
  const { lessonId, url, name, typeFile, index, listAssignment } = data;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="icon"></div>
          <div className="ms-4">
            <div className="text-xs text-muted" style={{ fontWeight: "600" }}>
              Lession{` ${number + 1}:  ${name}`}
            </div>
            <div className="text-xs text-muted">File/Url:{url}</div>
          </div>
        </div>
        <div className="ms-4 small">
          <div className="badge bg-light text-dark me-3">{typeFile}</div>
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
