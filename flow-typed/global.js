// @flow

declare class Object {
	static values: <T>(obj: { [key: any]: T }) => T[];
}

declare var soundManager: { setup: Function }
