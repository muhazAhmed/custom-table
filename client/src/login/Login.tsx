import { Button } from "@/components/ui/button";
import { IModal } from "@/lib/props";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { PostMethodAPI } from "@/api/dataTable";
import { newSessionStorage } from "@/lib/utils";

const Login: FC<IModal> = ({ onOpenChange }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const loginUser = async () => {
    const res = await PostMethodAPI({
      endpoint: "/login/user",
      payload,
      loading: setLoading,
    });
    if (res) {
      newSessionStorage("userInfo", res);
      onOpenChange(false);
    }
  };
  return (
    <div className="blur-bg">
      <div className="bg-white p-2 rounded-3xl w-[90%] lg:w-[30vw] h-[30vh] flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <Input
          placeholder="Email"
          className="w-[90%]"
          onChange={(e) => setPayload({ ...payload, email: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          className="w-[90%]"
          onChange={(e) => setPayload({ ...payload, password: e.target.value })}
        />
        <Button onClick={loginUser} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
