// Dependancies
const jwt = require("jsonwebtoken");

class ResponseHandlers {
  constructor(data, response) {
    (this.data = data), (this.res = response);
  }

  postResponse() {
    switch (this.data) {
      case undefined:
        return this.res.status(500).json({ message: "Server side error" });
      default:
        this.res.status(202).json({ message: "Created" });
    }
  }

  async postSessionResponse(access_token) {
    if (this.data == null || undefined)
      return this.res.status(500).json({ message: "Server side error" });
    // Decode the jwt token to extract the token payload
    const decodedToken = await jwt.decode(access_token);
    const existingPayload = decodedToken;

    // Generate a new payload with the session id added
    const newPayload = {
      ...existingPayload,
      sessionId: this.data.id,
    };

    // Generate a new access token
    const newAccessToken = await jwt.sign(
      newPayload,
      process.env.ACCESS_TOKEN_SECRET
    );

    return this.res
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .status(201)
      .json({ message: "Created" });
  }

  getResponse() {
    switch (this.data) {
      case undefined:
        return this.res.status(500).json({ message: "Server side error" });
      case null:
        return this.res.status(400).json({ message: "Bad Request" });
      default:
        this.res.status(200).json({ message: "Ok", data: this.data });
    }
  }

  updatesResponse() {
    switch (this.data) {
      case undefined:
        return this.res.status(500).json({ message: "Server side error" });
      case null:
        return this.res.status(400).json({ message: "Bad Request" });
      default:
        this.res.status(200).json({ message: "Ok", data: this.data });
    }
  }

  deleteResponse() {
    switch (this.data) {
      case undefined:
        return this.res.status(500).json({ message: "Server side error" });
      case null:
        return this.res.status(400).json({ message: "Bad Request" });
      default:
        this.res.status(200).json({ message: "Ok" });
    }
  }
}

module.exports = ResponseHandlers;
