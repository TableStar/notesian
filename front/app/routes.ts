import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  ...prefix("dashboard", [
    layout("routes/_dash.layout.tsx",[
      index("routes/dashboard.overview.tsx"),
      route("rooms","routes/dashboard.rooms.tsx")
    ])
  ]),
] satisfies RouteConfig;
