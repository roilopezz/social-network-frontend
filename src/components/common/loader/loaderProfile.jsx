import { Skeleton } from "@material-ui/lab";
import { Card, Avatar, CardHeader } from "@material-ui/core";

const LoaderProfile = () => {
  return (
    <div className=" rounded profile-header-cover ">
      <Card
        style={{
          borderStartStartRadius: "10px",
          height: "160px",
          position: "relative",
          bottom: "5px",
          //   right: "24px",
          //   width: "100%",
        }}
      >
        <Skeleton
          variant="circle"
          style={{
            // height: "100px",
            borderRadius: "100px",
            position: "relative",
            top: "20px",
            left: "25px",
            padding: "30px",
          }}
        >
          <Avatar />
        </Skeleton>

        <CardHeader
          subheader={
            <>
              <div className="d-flex justify-content-center">
                <Skeleton
                  style={{
                    position: "relative",
                    top: "20px",
                    marginRight: "10px",
                  }}
                  animation="wave"
                  height={20}
                  width="10%"
                  className="mb-1"
                />

                <Skeleton
                  style={{
                    position: "relative",
                    top: "20px",
                    marginRight: "10px",
                  }}
                  animation="wave"
                  height={20}
                  width="10%"
                  className="mb-1"
                />

                <Skeleton
                  style={{
                    position: "relative",
                    top: "20px",
                    marginRight: "10px",
                  }}
                  animation="wave"
                  height={20}
                  width="10%"
                  className="mb-1"
                />

                <Skeleton
                  style={{
                    position: "relative",
                    top: "20px",
                  }}
                  animation="wave"
                  height={20}
                  width="10%"
                  className="mb-1"
                />
              </div>
            </>
          }
        />
      </Card>

      <Card style={{ borderStartStartRadius: "10px" }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={15}
              width="9%"
              style={{ marginBottom: 6 }}
            />
          }
        />

        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="5%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={
            <>
              <Skeleton
                animation="wave"
                height={10}
                width="7%"
                className="mb-1"
              />

              <Skeleton animation="wave" height={10} width="10%" />
            </>
          }
        />

        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={30}
              width="95%"
              style={{ marginBottom: 6 }}
            />
          }
        />
      </Card>

      <Card style={{ borderStartStartRadius: "10px", marginTop: "25px" }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={15}
              width="9%"
              style={{ marginBottom: 6 }}
            />
          }
        />

        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="5%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={
            <>
              <Skeleton
                animation="wave"
                height={10}
                width="7%"
                className="mb-1"
              />

              <Skeleton animation="wave" height={10} width="10%" />
            </>
          }
        />
        {/* <br />
        <br />
        <br />
        <br /> */}
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={30}
              width="95%"
              style={{ marginBottom: 6 }}
            />
          }
        />
      </Card>
    </div>
  );
};

export default LoaderProfile;
