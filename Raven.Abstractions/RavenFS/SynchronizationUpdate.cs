﻿using System;

namespace Raven.Client.RavenFS
{
	public class SynchronizationUpdate : Notification
	{
		public string FileName { get; set; }
        public string DestinationFileSystemUrl { get; set; }
		public Guid SourceServerId { get; set; }
		public string SourceServerUrl { get; set; } // TODO arek: change it to source file system url and assign proper urls
		public SynchronizationType Type { get; set; }
		public SynchronizationAction Action { get; set; }
		public SynchronizationDirection SynchronizationDirection { get; set; }
	}

	public enum SynchronizationAction
	{
		Start,
		Finish
	}

	public enum SynchronizationDirection
	{
		Outgoing,
		Incoming
	}
}
