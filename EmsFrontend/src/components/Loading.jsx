function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-state">
      <span className="spinner" />
      {message}
    </div>
  );
}

export default Loading;
