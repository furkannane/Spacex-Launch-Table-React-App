
export interface Launch {
    id: string,
    mission_name: string,
    launch_date_utc: string,
    rocket: Rocket,
    launch_success: boolean,
  }

export interface LaunchDetails {
  details: string,
  id: string,
  launch_date_utc: string,
  mission_name: string,
  rocket: Rocket,
  links: Links,
}

export interface Links {
  article_link: string,
  video_link: string,
  wikipedia: string,
}

export interface Rocket {
    rocket_id: string,
    rocket_name: string,
    rocket_type: string,
}
  