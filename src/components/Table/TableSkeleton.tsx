import { theme } from "antd";
import "./tableSkeleton.css";

const TableSkeleton = () => {
  const {
    token: { colorBgContainer, colorBorder, colorBgLayout, borderRadius },
  } = theme.useToken();

  return (
    <div
      style={{
        backgroundColor: colorBgContainer,
        borderColor: colorBorder,
        borderRadius: borderRadius,
      }}
      className="w-full p-4"
    >
      <div className="overflow-hidden">
        <table className="table-auto w-full rounded-lg">
          <thead>
            <tr>
              {Array(10)
                .fill("")
                .map((_, index) => (
                  <th
                    key={index}
                    className="p-3"
                    style={{
                      height: "20px",
                      width: "150px",
                      backgroundColor: colorBgLayout,
                    }}
                  >
                    <div
                      style={{
                        height: "20px",
                        width: "150px",
                        backgroundColor: colorBgLayout,
                        borderRadius: borderRadius,
                      }}
                    />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill("")
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array(10)
                    .fill("")
                    .map((_, colIndex) => (
                      <td key={colIndex} className="p-3">
                        <div
                          className="shimmer"
                          style={{
                            height: "20px",
                            width: "150px",
                            backgroundColor: colorBgLayout,
                            borderRadius: borderRadius,
                          }}
                        />
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
