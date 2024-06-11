export default function Spinner() {
  const bars = Array.from({length: 12});

  return (
    <div className="container">
      <div className="spinner">
        {bars.map((_bar, i) => (
          <div key={i} className="bar" />
        ))}
      </div>

      <style jsx>{`
        .container {
          width: 20px;
          height: 20px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          position: relative;
          top: 50%;
          left: 50%;
        }

        .bar {
          animation: spin 1.2s linear infinite;
          background: hsla(0, 0%, 56%, 1);
          width: 24%;
          position: absolute;
          height: 8%;
          left: -10%;
          top: -3.9%;
        }

        @keyframes spin {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0.15;
          }
        }

        ${bars
          .map(
            (_bar, i) => `
              .bar:nth-child(${i + 1}) {
                animation-delay: -${1300 - (i + 1) * 100}ms;
                transform: rotate(${i * 30}deg) translate(146%);
              }
            `,
          )
          .join("\n")}
      `}</style>
    </div>
  );
}
