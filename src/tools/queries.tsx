import {gql } from '@apollo/client';

export const LAUNCHES_UPCOMING_QUERY = gql`
query GetLaunches {
  launchesUpcoming {
    id
    mission_name
    launch_date_utc
    launch_success
    rocket {
      rocket_name
      rocket_type
    }
  }
}
`

export const LAUNCHES_PAST_QUERY = gql`
query GetLaunches {
    launchesPast {
      id
      mission_name
      launch_date_utc
      launch_success
      rocket {
        rocket_name
        rocket_type
      }
  }
}
`

export const LAUNCH_DETAILS_QUERY = gql`
  query LaunchDetailsQuery($launchId: ID!) {
    launch(id: $launchId) {
      details
      id
      launch_date_utc
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
      links {
        article_link
        video_link
        wikipedia
      }
    }
  }
`
