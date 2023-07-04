# Calendar Optimization Service

This service is responsible by optimizing a set of events on a given day using a genetic algorithm approach.

The service is called everytime an event is added or edited (on the calendar_event_service) or on demand.

The optimization task receives the list of events of the day to optimize and returns the same list with the times re-scheduled. It calls the calendar_provider_service to update the day's calendar.
