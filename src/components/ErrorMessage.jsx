export default function ErrorMessage({ message, onRetry }) {
    return (
      <div className="error-message">
        <p style={{ color: "red" }}>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            Try Again
          </button>
        )}
      </div>
    );
  }